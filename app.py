import psycopg2
from flask import Flask,render_template, request,redirect,url_for
import re


app = Flask(__name__)
app.run(host="0.0.0.0", port=5000)

def db_conn():
    conn = psycopg2.connect(database="wordle",host="gallantly-musical-protozoa.data-1.use1.tembo.io",user="postgres",password="7UbYBsumz2tpclgT",port="5432")
    return conn


@app.route('/get_words',methods=['GET'])
def test():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute('''SELECT * FROM words ''')
    data = cur.fetchall()
    cur.close()
    conn.close()
    return data

@app.route('/user_word',methods=['GET'])
def users():
    conn = db_conn()
    cur = conn.cursor()
    email= request.form['email']
    cur.execute('''SELECT * FROM USERS WHERE  USER_ID=%s''',(email))
    data = cur.fetchall()
    cur.close()
    conn.close()
    return data

@app.route('/crt_user',methods=['POST'])
def crt_user():
    conn = db_conn()
    cur = conn.cursor()
    email = request.args.get('email')
    username = request.args.get('username')
    prof_url = request.args.get('prof_url')
    query = '''INSERT INTO users (USER_ID, USERNAME, PROF_IMG) VALUES (%s, %s, %s)'''
    cur.execute(query, (email, username, prof_url))
    
    conn.commit()
    conn.close()
    
    return None

@app.route('/get_word',methods=['POST'])
def get_word():
    conn = db_conn()
    cur = conn.cursor()
    email = request.args.get('email')
    query = '''SELECT * FROM words as word WHERE word not in (SELECT * FROM word_user WHERE USER_ID = %s)'''
    cur.execute(query, (email))
    
    conn.commit()
    conn.close()
    
    return None
