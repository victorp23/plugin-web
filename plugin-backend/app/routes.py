from flask import Blueprint, request, jsonify
from app import db
from app.models import Vulnerability
from app.vulnerability_scanner import analyze_url
import json

bp = Blueprint('main', __name__)

@bp.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    url = data.get('url')

    # Verificar si la URL ya ha sido analizada
    existing_vulns = Vulnerability.query.filter_by(url=url).all()
    if existing_vulns:
        # Si ya existe, devolver los resultados almacenados
        results = {}
        for vuln in existing_vulns:
            if vuln.vulnerability_type not in results:
                results[vuln.vulnerability_type] = {"estado": True if vuln.severity == "High" else False, "detalles": [vuln.details]}
            else:
                results[vuln.vulnerability_type]["detalles"].append(vuln.details)
        return jsonify(results)

    # Si no existe, realizar el análisis
    analysis_results = analyze_url(url)

    # Almacenar los resultados en la base de datos
    for vuln_type, details in analysis_results.items():
        # Convertir cada detalle en una cadena JSON si es un diccionario
        detalles = details["detalles"]
        if not isinstance(detalles, list):
            detalles = [detalles]
        detalles_str = "\n".join(
            [json.dumps(detalle) if isinstance(detalle, dict) else str(detalle) for detalle in detalles]
        )
        vulnerability = Vulnerability(
            url=url,
            vulnerability_type=vuln_type,
            severity="High" if details["estado"] else "Low",
            details=detalles_str
        )
        db.session.add(vulnerability)
    db.session.commit()

    return jsonify(analysis_results)
