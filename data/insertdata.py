from pymysql.converters import escape_string
import pymysql
import csv
import re
import string
import random
import sys

DBHOST = 'localhost'
DBUSER = 'root'
DBPASS = ''
DBNAME = 'ecommerce'

csv.field_size_limit(sys.maxsize)


def text(desstr, restr=''):
    res = re.compile("[^\u4e00-\u9fa5^a-z^A-Z^0-9:\- ]")
    ret = escape_string(res.sub(restr, desstr))
    return ret if ret.strip() != '' else ''.join(random.choice(string.ascii_lowercase) for i in range(5))


try:
    conn = pymysql.connect(host=DBHOST, user=DBUSER,
                           password=DBPASS, database=DBNAME, charset='utf8')
    print('连接成功')
except pymysql.Error as e:
    print('连接失败:' + str(e))

cursor = conn.cursor()


def inject(conn, tb, types):
    with open(tb+'.csv') as f:
        f_csv = csv.reader(open(tb+'.csv', 'r'))

        headers = next(f_csv)
        func_dic = [int, float, text, escape_string]
        type_dic = ["%d", "%.2f", "'%s'", "'%s'"]
        type_str = ','.join([type_dic[x] for x in types])
        for row in f_csv:
            try:
                cursor = conn.cursor()
                sql = f"insert into `{tb}` ({','.join(headers)}) values({type_str})" % (tuple(func_dic[types[i]](row[i])
                                                                                              for i in range(len(headers))))
                # sql1 = "insert into game(id,name,price,description,release_date,status) values(%d,'%s',%.2f,'%s','%s',%d)" % (
                #     int(row[0]), escape_string(row[1]), float(row[2]), escape_string(row[3]), escape_string(row[4]), int(row[5]))
                cursor.execute(sql)
                conn.commit()
            except (pymysql.Error, pymysql.Warning) as e:
                print(e)
                print(sql[:50])
                conn.rollback()


# 0:int, 1:float, 2:string
inject(conn, 'game', [0, 2, 1, 2, 2, 0])
inject(conn, 'user', [0, 2, 2, 2])
inject(conn, 'game_order', [0, 0])
inject(conn, 'order', [0, 0, 2, 0])
inject(conn, 'game_tag', [0, 2])
inject(conn, 'comment', [0, 2, 0, 0, 0])
inject(conn, 'picture', [0, 0, 3])


conn.close()
