
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

# 2. Création d'un serveur web
PORT = 8081

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '/benji.html':
            # On lit les contacts dans la base de données SQLite
            conn = sqlite3.connect("contacts.db")
            cursor = conn.cursor()
            cursor.execute("SELECT nom, telephone FROM contacts")
            contacts = cursor.fetchall()
            conn.close()

            # On génère la liste des contacts en HTML
            contacts_html = ""
            for contact in contacts:
                contacts_html += f"<li><strong>{contact[0]}</strong> — {contact[1]}</li>"
            
            if not contacts_html:
                contacts_html = "<li>Aucun contact pour le moment.</li>"

            # On lit le fichier benji.html et on y injecte nos contacts
            try:
                with open("benji.html", "r", encoding="utf-8") as f:
                    html_content = f.read()
                
                # Remplacement du texte de la liste par les vrais contacts
                html_content = html_content.replace("<!-- LISTE_CONTACTS -->", contacts_html)

                # On envoie la page au navigateur
                self.send_response(200)
                self.send_header("Content-type", "text/html; charset=utf-8")
                self.end_headers()
                self.wfile.write(html_content.encode("utf-8"))
            except FileNotFoundError:
                self.send_error(404, "Fichier benji.html introuvable")
        else:
            return super().do_GET()

    def do_POST(self):
        # Récupération des données du formulaire
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

        # Redirection vers benji.html pour voir le résultat mis à jour
        self.send_response(303)
        self.send_header('Location', '/benji.html')
        self.end_headers()

# Lancement du serveur
with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Serveur démarré ! Ouvrez http://localhost:{PORT}/benji.html dans votre navigateur.")
    httpd.serve_forever()