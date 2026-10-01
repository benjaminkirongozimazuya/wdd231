import sqlite3
import http.server
import socketserver
import urllib.parse

# 1. Configuration de la base de données SQLite
def init_db():
    conn = sqlite3.connect("contacts.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT,
            telephone TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

# 2. Création d'un serveur web simple pour interagir avec la page HTML
PORT = 8000

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

    def do_POST(self):
        # Récupération des données envoyées depuis le formulaire web
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode('utf-8')
        params = urllib.parse.parse_qs(post_data)
        
        nom = params.get('nom', [''])[0]
        telephone = params.get('telephone', [''])[0]

        # Enregistrement dans SQLite
        if nom and telephone:
            conn = sqlite3.connect("contacts.db")
            cursor = conn.cursor()
            cursor.execute("INSERT INTO contacts (nom, telephone) VALUES (?, ?)", (nom, telephone))
            conn.commit()
            conn.close()

        # Redirection vers la page d'accueil
        self.send_response(303)
        self.send_header('Location', '/')
        self.end_headers()

# Lancement du serveur
with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Serveur démarré ! Ouvrez http://localhost:{PORT} dans votre navigateur.")
    httpd.serve_forever()