from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Delfines/2@localhost/tienda_vicky_gurumis'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


#****************************************************************************************************
class Producto(db.Model):
    idproducto = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    tipo = db.Column(db.String(100), nullable=False)
    nombre = db.Column(db.String(200), nullable=False)
    descripcion = db.Column(db.String(500), nullable=False)
    disponibilidad = db.Column(db.String(20), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    imagen = db.Column(db.String(255), nullable=False)
    codigo = db.Column(db.String(100), nullable=False)

    def __init__(self, tipo, nombre, descripcion, disponibilidad, precio, imagen, codigo):
        self.tipo = tipo
        self.nombre = nombre
        self.descripcion = descripcion
        self.disponibilidad = disponibilidad
        self.precio = precio
        self.imagen = imagen
        self.codigo = codigo


# --- Esquema Producto ---

class ProductoSchema(ma.Schema):
    class Meta:
        model = Producto
        fields = ('idproducto', 'tipo', 'nombre', 'descripcion', 'disponibilidad', 'precio', 'imagen', 'codigo')

producto_schema = ProductoSchema()
productos_schema = ProductoSchema(many=True)

# --- Rutas Producto ---

@app.route('/producto', methods=['GET'])
def get_producto():
    all_producto = Producto.query.all()
    result = productos_schema.dump(all_producto)
    return jsonify(result)

@app.route("/producto", methods=["POST"])
def create_producto():
    tipo = request.json.get('tipo')
    nombre = request.json.get("nombre")
    descripcion = request.json.get("descripcion")
    disponibilidad = request.json.get('disponibilidad')
    precio = request.json.get("precio")
    imagen = request.json.get("imagen")
    codigo = request.json.get("codigo")

    new_producto = Producto(tipo=tipo, nombre=nombre, descripcion=descripcion,
                            disponibilidad=disponibilidad, precio=precio, imagen=imagen, codigo=codigo)
    db.session.add(new_producto)
    db.session.commit()

    return producto_schema.jsonify(new_producto)

@app.route("/producto/<id>", methods=["PUT"])
def update_producto(id):
    producto = Producto.query.get(id)
    if producto:
        tipo = request.json.get('tipo')
        nombre = request.json.get("nombre")
        descripcion = request.json.get("descripcion")
        disponibilidad = request.json.get('disponibilidad')
        precio = request.json.get("precio")
        imagen = request.json.get("imagen")
        codigo = request.json.get("codigo")

        producto.tipo = tipo
        producto.nombre = nombre
        producto.descripcion = descripcion
        producto.disponibilidad = disponibilidad
        producto.precio = precio
        producto.imagen = imagen
        producto.codigo = codigo

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



# --- Clase Pedido ---
class Pedido(db.Model):
    idpedido = db.Column(db.Integer, primary_key=True)
    idcliente = db.Column(db.Integer, nullable=False)
    idproducto = db.Column(db.Integer, nullable=False)  # Agregamos el campo idproducto
    cantidad = db.Column(db.Integer, nullable=False)
    estado = db.Column(db.String(50))
    fecha_entrega = db.Column(db.Date)

    def __init__(self, idcliente, idproducto, cantidad, estado, fecha_entrega):
        self.idcliente = idcliente
        self.idproducto = idproducto
        self.cantidad = cantidad
        self.estado = estado
        self.fecha_entrega = fecha_entrega

# --- Esquema Pedido ---

class PedidoSchema(ma.Schema):
    class Meta:
        model = Pedido
        fields = ('idpedido', 'idcliente', 'idproducto', 'cantidad', 'estado', 'fecha_entrega')

pedido_schema = PedidoSchema()
pedidos_schema = PedidoSchema(many=True)

# --- Rutas Pedido ---

@app.route("/pedido", methods=["POST"])
def create_pedido():
    idcliente = request.json.get("idcliente")
    idproducto = request.json.get("idproducto")
    cantidad = request.json.get("cantidad")
    estado = request.json.get("estado")
    fecha_entrega = request.json.get("fecha_entrega")

    new_pedido = Pedido(idcliente=idcliente, idproducto=idproducto,
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

# --- Clase Cliente ---
class Cliente(db.Model):
    idcliente = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(20), nullable=False)
    apellido = db.Column(db.String(20), nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    cel = db.Column(db.String(15), nullable=False)
    direccion = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(30), nullable=False)

    def __init__(self, nombre, apellido, edad, cel, direccion, email):
        self.nombre = nombre
        self.apellido = apellido
        self.edad = edad
        self.cel = cel
        self.direccion = direccion
        self.email = email

# --- Esquema Cliente ---

class ClienteSchema(ma.Schema):
    class Meta:
        model = Cliente

#************************
# --- Clase Factura ---

# --- Clase Factura ---

class Factura(db.Model):
    idfactura = db.Column(db.Integer, primary_key=True)
    idcliente = db.Column(db.Integer, nullable=False)
    idpedido = db.Column(db.Integer, nullable=False)  # Agregamos el campo idpedido
    fecha_emision = db.Column(db.Date)

    def __init__(self, idcliente, idpedido, fecha_emision):
        self.idcliente = idcliente
        self.idpedido = idpedido
        self.fecha_emision = fecha_emision

# --- Esquema Factura ---

class FacturaSchema(ma.Schema):
    class Meta:
        model = Factura
        fields = ('idfactura', 'idcliente', 'idpedido', 'fecha_emision')

factura_schema = FacturaSchema()
facturas_schema = FacturaSchema(many=True)

# --- Rutas Factura ---

@app.route("/factura", methods=["POST"])
def create_factura():
    idcliente = request.json.get("idcliente")
    idpedido = request.json.get("idpedido")
    fecha_emision = request.json.get("fecha_emision")

    new_factura = Factura(idcliente=idcliente, idpedido=idpedido, fecha_emision=fecha_emision)
    db.session.add(new_factura)
    db.session.commit()

    return factura_schema.jsonify(new_factura)

@app.route("/factura", methods=["GET"])
def get_facturas():
    all_facturas = Factura.query.all()
    result = facturas_schema.dump(all_facturas)
    return jsonify(result)

@app.route("/factura/<id>", methods=["GET"])
def get_factura(id):
    factura = Factura.query.get(id)
    if factura:
        return factura_schema.jsonify(factura)
    else:
        return jsonify({"message": "Factura no encontrada"}), 404

@app.route("/factura/<id>", methods=["PUT"])
def update_factura(id):
    factura = Factura.query.get(id)
    if factura:
        idcliente = request.json.get("idcliente")
        idpedido = request.json.get("idpedido")
        fecha_emision = request.json.get("fecha_emision")

        factura.idcliente = idcliente
        factura.idpedido = idpedido
        factura.fecha_emision = fecha_emision

        db.session.commit()

        return factura_schema.jsonify(factura)
    else:
        return jsonify({"message": "Factura no encontrada"}), 404

@app.route("/factura/<id>", methods=["DELETE"])
def delete_factura(id):
    factura = Factura.query.get(id)
    if factura:
        db.session.delete(factura)
        db.session.commit()
        return jsonify({"message": "Factura eliminada correctamente"})
    else:
        return jsonify({"message": "Factura no encontrada"}), 404
    
    
    
#************************
if __name__ == '__main__':
    app.run(debug=True)
