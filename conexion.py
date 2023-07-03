import mysql.connector

class DatabaseConnection:
    def __init__(self, host, user, password, port, database): 
        self.host = host
        self.user = user
        self.password = password
        self.port = port
        self.database = database
        self.connection = None 

    def connect(self):

        try:
            self.connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                port=self.port, 
                database=self.database,
            )
            print("Conexión exitosa a la base de datos.")
        except mysql.connector.Error as error:
            print("No se pudo establecer la conexión: {}".format(error))



    def close(self):  #cerramos conexion
        if self.connection:
            self.connection.close()
            print("Conexión cerrada.")

connection = DatabaseConnection(
    host='localhost',
    user='root', 
    password='****',
    port=3306,
    database='tienda_vicky_gurumis'
)
# Establecer la conexión
connection.connect()

# Cerrar la conexión
#connection.close()