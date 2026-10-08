from flask import Flask, jsonify, request, send_from_directory
import mysql.connector

app = Flask(__name__, static_folder='static')

# Configuration de la connexion MySQL
def get_db_connection():
    return mysql.connector.connect(
        host="127.0.0.1",
        port=3306,
        user="root",
        password="Kiro@weathers1",
        database="magasin_db",
        auth_plugin="mysql_native_password"
    )

# Servir la page HTML principale
@app.route('/')
def home():
    return send_from_directory('static', 'index.html')

# API Route : Récupérer tous les équipements
@app.route('/api/equipements', methods=['GET'])
def get_equipements():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM equipements;")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

# API Route : Ajouter un équipement
@app.route('/api/equipements', methods=['POST'])
def add_equipement():
    new_data = request.json
    nom = new_data.get('nom')
    quantite = new_data.get('quantite')
    categorie = new_data.get('categorie')

    conn = get_db_connection()
    cursor = conn.cursor()
    sql = "INSERT INTO equipements (nom, quantite, categorie) VALUES (%s, %s, %s);"
    cursor.execute(sql, (nom, quantite, categorie))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Équipement ajouté avec succès !"}), 201

# API Route : Supprimer un équipement
@app.route('/api/equipements/<int:id>', methods=['DELETE'])
def delete_equipement(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM equipements WHERE id = %s;", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Équipement supprimé avec succès !"}), 200

# API Route : Modifier un équipement
@app.route('/api/equipements/<int:id>', methods=['PUT'])
def update_equipement(id):
    data = request.json
    nom = data.get('nom')
    quantite = data.get('quantite')
    categorie = data.get('categorie')

    conn = get_db_connection()
    cursor = conn.cursor()
    sql = "UPDATE equipements SET nom = %s, quantite = %s, categorie = %s WHERE id = %s;"
    cursor.execute(sql, (nom, quantite, categorie, id))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Équipement mis à jour avec succès !"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)