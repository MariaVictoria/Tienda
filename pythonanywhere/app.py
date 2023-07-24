from flask import Flask ,jsonify ,request, send_file
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields

# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS

app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://vickygurumis:****@vickygurumis.mysql.pythonanywhere-services.com/vickygurumis$tienda'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none

db= SQLAlchemy(app)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(app)   #crea el objeto ma de de la clase Marshmallow


#****************************************************************************************************
class Producto(db.Model):
    idproducto = db.Column(db.Integer, primary_key=True, nullable=False)
    tipo = db.Column(db.String(100), nullable=False)
    nombre = db.Column(db.String(200), nullable=False)
    descripcion = db.Column(db.String(500), nullable=False)
    disponibilidad = db.Column(db.String(20), nullable=False)
    precio = db.Column(db.Float, nullable=False)

    imagen = db.Column(db.String(255), nullable=False)
    codigo = db.Column(db.String(100), nullable=False)


    def __init__(self, idproducto, tipo, nombre, descripcion, disponibilidad, precio, imagen, codigo):
        self.idproducto = idproducto
        self.tipo= tipo
        self.nombre = nombre
        self.descripcion = descripcion
        self.disponibilidad=disponibilidad
        self.precio = precio

        self.imagen = imagen
        self.codigo = codigo

#*** esquema ***
class ProductoSchema(ma.Schema):
    class Meta:
        model = Producto
        fields = ('idproducto', 'tipo', 'nombre', 'descripcion','disponibilidad', 'precio', 'imagen','codigo')

producto_schema = ProductoSchema()
productos_schema = ProductoSchema(many=True)

#****  Rutas **
@app.route('/producto', methods=['GET'])
def get_producto():
    all_producto = Producto.query.all()
    result = productos_schema.dump(all_producto)
    return jsonify(result)

@app.route("/producto", methods=["POST"])
def create_producto():
    idproducto = request.json.get("idproducto")
    tipo =request.json.get('tipo')
    nombre = request.json.get("nombre")
    descripcion = request.json.get("descripcion")
    disponibilidad= request.json.get('disponibilidad')
    precio = request.json.get("precio")

    imagen = request.json.get("imagen")
    codigo = request.json.get("codigo")

    new_producto = Producto(idproducto=idproducto,tipo=tipo, nombre=nombre, descripcion=descripcion, disponibilidad=disponibilidad, precio=precio, imagen=imagen,codigo=codigo)
    db.session.add(new_producto)
    db.session.commit()

    return producto_schema.jsonify(new_producto)


@app.route("/producto/<id>", methods=["PUT"])
def update_producto(id):
    producto = Producto.query.get(id)
    if producto:
        producto.idproducto = request.json["idproducto"]
        producto.tipo=request.json['tipo']
        producto.nombre = request.json["nombre"]
        producto.descripcion = request.json["descripcion"]
        producto.disponibilidad=request.json['disponibilidad']
        producto.precio = request.json["precio"]

        producto.imagen = request.json["imagen"]
        producto.codigo = request.json["codigo"]

        db.session.commit()

        return jsonify({"message": "Producto actualizado correctamente"})
    else:
        return jsonify({"message": "Producto no encontrado"}), 404

@app.route("/producto/<id>", methods=["DELETE"])
def delete_producto(id):
    producto = Producto.query.get(id)
    if producto:
        db.session.delete(producto)
        db.session.commit()
        return jsonify({"message": "Producto eliminado correctamente"})
    else:
        return jsonify({"message": "Producto no encontrado"}), 404


#************************

class Pedido(db.Model):
    idpedido = db.Column(db.Integer, primary_key=True)
    idcliente = db.Column(db.Integer, nullable=False)
    idproducto = db.Column(db.Integer)
    cantidad = db.Column(db.Integer)
    estado = db.Column(db.String(50))
    fecha_entrega = db.Column(db.Date)

    def __init__(self, idpedido, idcliente, idproducto, cantidad, estado, fecha_entrega):
        self.idpedido = idpedido
        self.idcliente = idcliente
        self.idproducto = idproducto
        self.cantidad = cantidad
        self.estado = estado
        self.fecha_entrega = fecha_entrega

# Esquemas
class PedidoSchema(ma.Schema):
    class Meta:
        model = Pedido
        fields = ('idpedido', 'idcliente', 'idproducto', 'cantidad', 'estado', 'fecha_entrega')

pedido_schema = PedidoSchema()
pedidos_schema = PedidoSchema(many=True)

@app.route("/pedido", methods=["POST"])
def create_pedido():
    idpedido = request.json.get("idpedido")
    idcliente = request.json.get("idcliente")
    idproducto = request.json.get("idproducto")
    cantidad = request.json.get("cantidad")
    estado = request.json.get("estado")
    fecha_entrega = request.json.get("fecha_entrega")

    new_pedido = Pedido(idpedido=idpedido, idcliente=idcliente, idproducto=idproducto,
                        cantidad=cantidad, estado=estado, fecha_entrega=fecha_entrega)
    db.session.add(new_pedido)
    db.session.commit()

    return pedido_schema.jsonify(new_pedido)

@app.route("/pedido", methods=["GET"])
def get_pedidos():
    all_pedidos = Pedido.query.all()
    result = pedidos_schema.dump(all_pedidos)
    return jsonify(result)

@app.route("/pedido/<id>", methods=["GET"])
def get_pedido(id):
    pedido = Pedido.query.get(id)
    if pedido:
        return pedido_schema.jsonify(pedido)
    else:
        return jsonify({"message": "Pedido no encontrado"}), 404

@app.route("/pedido/<id>", methods=["PUT"])
def update_pedido(id):
    pedido = Pedido.query.get(id)
    if pedido:
        idcliente = request.json.get("idcliente")
        idproducto = request.json.get("idproducto")
        cantidad = request.json.get("cantidad")
        estado = request.json.get("estado")
        fecha_entrega = request.json.get("fecha_entrega")

        pedido.idcliente = idcliente
        pedido.idproducto = idproducto
        pedido.cantidad = cantidad
        pedido.estado = estado
        pedido.fecha_entrega = fecha_entrega

        db.session.commit()

        return pedido_schema.jsonify(pedido)
    else:
        return jsonify({"message": "Pedido no encontrado"}), 404

@app.route("/pedido/<id>", methods=["DELETE"])
def delete_pedido(id):
    pedido = Pedido.query.get(id)
    if pedido:
        db.session.delete(pedido)
        db.session.commit()
        return jsonify({"message": "Pedido eliminado correctamente"})
    else:
        return jsonify({"message": "Pedido no encontrado"}), 404

#************************
class ClienteSchema(Schema):
    idcliente = fields.Integer()
    nombre = fields.String()
    apellido = fields.String()
    edad = fields.Integer()
    cel = fields.String()
    direccion = fields.String()
    email = fields.String()

    def __init__(self, nombre, apellido, edad, cel, direccion, email):
        self.nombre = nombre
        self.apellido = apellido
        self.edad = edad
        self.cel = cel
        self.direccion = direccion
        self.email = email
        
cliente_schema = ClienteSchema()
clientes_schema = ClienteSchema(many=True)

@app.route("/cliente", methods=["POST"])
def create_cliente():
    # Obtén los datos del cliente del cuerpo de la solicitud JSON
    nombre = request.json.get("nombre")
    apellido = request.json.get("apellido")
    edad = request.json.get("edad")
    cel = request.json.get("cel")
    direccion = request.json.get("direccion")
    email = request.json.get("email")

    # Crea una nueva instancia del modelo Cliente con los datos recibidos
    new_cliente = Cliente(nombre=nombre, apellido=apellido, edad=edad, cel=cel, direccion=direccion, email=email)

    # Agrega el nuevo cliente a la sesión de la base de datos
    db.session.add(new_cliente)
    db.session.commit()

    # Devuelve la representación JSON del cliente creado
    return cliente_schema.jsonify(new_cliente)

#************************

class Factura(db.Model):
    idfactura = db.Column(db.Integer, primary_key=True)
    idcliente = db.Column(db.Integer, nullable=False)
    fecha_emision = db.Column(db.Date)

    def __init__(self, idcliente, fecha_emision):
        self.idcliente = idcliente
        self.fecha_emision = fecha_emision


with app.app_context():
    db.create_all()

#  ************************************************************




@app.route('/')
def index():
    # Ruta de ejemplo que devuelve un archivo

    return send_file('Ingresar.html')

if __name__ == '__main__':
    app.run(port=5000)
    # ejecuta el servidor Flask en el puerto 5000



