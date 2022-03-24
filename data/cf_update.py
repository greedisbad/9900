import pymysql
import pandas as pd
import surprise

DB_NAME = "db_name"
PSW = "password"


def main():
    db = pymysql.connect(host="localhost", user="root",
                         password=PSW, db=DB_NAME, port=3306)
    cursor = db.cursor()
    data, uids, gids = get_data(cursor)
    # print(data)

    algo = surprise.SVD()
    reader = surprise.Reader(rating_scale=(1, 5))
    data = surprise.Dataset.load_from_df(
        data[['user_id', 'game_id', 'rating']].dropna(), reader)
    trainset = data.build_full_trainset()
    algo.fit(trainset)

    for uid in uids:
        purchased_games = get_purchased_gid(cursor, uid)
        recommends = sorted([(algo.predict(uid, gid).est, gid)
                             for gid in gids-purchased_games], reverse=True)[:50]
        print(recommends)

        sql = "INSERT INTO recommend (user_id, game_id) VALUES (%s, %s)"
        val = [(uid, gid) for _, gid in recommends]
        cursor.executemany(sql, val)

    db.commit()
    db.close()


def get_data(cursor):
    cursor.execute("select user_id, game_id, rating from comment")
    userId, gameId, rating = [], [], []
    for row in cursor.fetchall():
        userId.append(row[0])
        gameId.append(row[1])
        rating.append(row[2])
    data = {"user_id": userId, "game_id": gameId, "rating": rating}
    return pd.DataFrame(data), set(userId), set(gameId)


def get_purchased_gid(cursor, uid):
    cursor.execute(f"select game_id from comment WHERE user_id={uid}")
    return {row[0] for row in cursor.fetchall()}


if __name__ == "__main__":
    main()
