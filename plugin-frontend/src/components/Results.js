import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Results = ({ result }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});

    if (!result) return null;

    const vulnerabilityTypes = {
        https: 'HTTPS',
        ssl: 'Certificado SSL',
        xss: 'Cross-Site Scripting (XSS)',
        csrf: 'Cross-Site Request Forgery (CSRF)',
        sqli: 'Inyección SQL',
        missing_security_headers: 'Cabeceras de Seguridad Faltantes',
        malicious_links: 'Enlaces Maliciosos',
        malicious_scripts: 'Scripts Maliciosos',
        suspicious_redirects: 'Redirecciones Sospechosas'
    };

    const handleShowModal = (vuln) => {
        setModalContent({
            type: vulnerabilityTypes[vuln],
            details: result[vuln].detalles,
        });
        setShowModal(true);
    };

    const renderDetails = (details) => {
        return details.map((detail, index) => {
            if (typeof detail === 'string') {
                return <li key={index}>{detail}</li>;
            } else if (typeof detail === 'object') {
                return (
                    <li key={index}>
                        {detail.HTML && (
                            <>
                                <strong>HTML:</strong>
                                <SyntaxHighlighter language="html" style={darcula}>
                                    {detail.HTML}
                                </SyntaxHighlighter>
                            </>
                        )}
                        {detail.Contenido && (
                            <>
                                <strong>Contenido:</strong>
                                <SyntaxHighlighter language="javascript" style={darcula}>
                                    {detail.Contenido}
                                </SyntaxHighlighter>
                            </>
                        )}
                        {detail.Patrón && <><strong>Patrón:</strong> {detail.Patrón}<br /></>}
                        {detail.Peligro && <><strong>Peligro:</strong> {detail.Peligro}<br /></>}
                        {detail.Acción && <><strong>Acción:</strong> {detail.Acción}<br /></>}
                        {detail.Método && <><strong>Método:</strong> {detail.Método}<br /></>}
                        {detail.URL && <><strong>URL:</strong> {detail.URL}<br /></>}
                        {detail["Código de Estado"] && <><strong>Código de Estado:</strong> {detail["Código de Estado"]}<br /></>}
                        {detail["Tipo de amenaza"] && <><strong>Tipo de amenaza:</strong> {detail["Tipo de amenaza"]}<br /></>}
                    </li>
                );
            }
            return null;
        });
    };

    const renderRows = (data) => (
        Object.keys(data).map((key, index) => (
            <tr key={index} className={data[key].estado ? 'table-danger' : 'table-success'}>
                <td>{vulnerabilityTypes[key]}</td>
                <td>{data[key].estado ? 'Vulnerable' : 'No Vulnerable'}</td>
                <td>
                    <Button variant="info" onClick={() => handleShowModal(key)}>
                        Informe
                    </Button>
                </td>
            </tr>
        ))
    );

    return (
        <div className="container mt-5">
            <h2>Resultado de Análisis</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Tipo de Vulnerabilidad</th>
                        <th>Estado</th>
                        <th>Informe</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows(result)}
                </tbody>
            </table>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Informe de Vulnerabilidad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>{modalContent.type}</h5>
                    <ul>
                        {modalContent.details && renderDetails(modalContent.details)}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

Results.propTypes = {
    result: PropTypes.object.isRequired
};

export default Results;
