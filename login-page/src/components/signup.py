import json
import mysql.connector
from werkzeug.security import generate_password_hash
from http.server import BaseHTTPRequestHandler, HTTPServer

# MySQL database connection details
db_config = {
    'host': 'localhost',
    'user': 'root',      # Default MySQL username in XAMPP
    'password': '',      # Default MySQL password in XAMPP (blank)
    'database': 'signup',
    'port':'3310'
}

# Connect to MySQL database
def get_db_connection():
    connection = mysql.connector.connect(**db_config)
    return connection

# Store signup data (name, email, password) into the database
def store_signup_data(name, email, password):
    hashed_password = generate_password_hash(password)
    connection = get_db_connection()

    if connection:
        cursor = connection.cursor()

        # Check if the email already exists
        cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            return {'error': 'Email is already registered'}

        # Insert new user into the database
        cursor.execute('INSERT INTO users (name, email, password) VALUES (%s, %s, %s)', 
                       (name, email, hashed_password))
        connection.commit()

        cursor.close()
        connection.close()

        return {'message': 'Signup successful! User registered.'}
    else:
        return {'error': 'Failed to connect to the database'}

# Define the request handler
class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/signup':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)

            try:
                data = json.loads(post_data.decode('utf-8'))
                name = data['name']
                email = data['email']
                password = data['password']

                response_data = store_signup_data(name, email, password)

                self.send_response(200 if 'message' in response_data else 400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(response_data).encode('utf-8'))

            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))

# Set up and start the server
def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
