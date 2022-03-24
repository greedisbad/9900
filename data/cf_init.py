import pymysql
import pandas as pd
import numpy as np
import surprise
import sys


def main(uid):
    db = pymysql.connect(host="localhost", user="root",
                         password="1997111919", db="test", port=3306)
    cursor = db.cursor()
    data, uids, gids = get_data(cursor)

    algo = surprise.SVD()
    reader = surprise.Reader(rating_scale=(1, 5))
    data = surprise.Dataset.load_from_df(
        data[['user_id', 'game_id', 'rating']].dropna(), reader)
    trainset = data.build_full_trainset()
    algo.fit(trainset)

    purchased_games = get_purchased_gid(cursor, uid)
    gids = gids - purchased_games
    print(data)

    for uid in uids:
        arr = sorted([(algo.predict(uid, gid).est, gid) for gid in gids])[:50]
        print(arr)

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
