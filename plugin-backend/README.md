# Vulnerability Analyzer

Este proyecto es una aplicación web para analizar vulnerabilidades en sitios web utilizando Flask para el backend y React para el frontend.

## Instalación

### Backend

1. Navega al directorio `backend`.
2. Crea un entorno virtual:
    ```bash
    python -m venv venv
    ```
3. Activa el entorno virtual:
    ```bash
    # En Windows
    venv\Scripts\activate

    # En macOS/Linux
    source venv/bin/activate
    ```
4. Instala los paquetes requeridos:
    ```bash
    pip install -r requirements.txt
    ```
5. Ejecuta la aplicación Flask:
    ```bash
    python run.py
    ```

### Frontend

1. Navega al directorio `frontend`.
2. Instala las dependencias:
    ```bash
    npm install
    ```
3. Inicia el servidor de desarrollo:
    ```bash
    npm start
    ```

## Uso

1. Abre tu navegador y ve a `http://localhost:9000` para acceder al frontend.
2. Ingresa una URL para analizar y ver los resultados.
