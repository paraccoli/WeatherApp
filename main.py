import subprocess
import threading
import webbrowser
import time
from backend.app import app

def run_backend():
    app.run(port=5000)

def run_frontend():
    subprocess.Popen(["python", "-m", "http.server", "8000"], cwd="frontend")

if __name__ == "__main__":
    backend_thread = threading.Thread(target=run_backend)
    backend_thread.start()

    frontend_thread = threading.Thread(target=run_frontend)
    frontend_thread.start()

    time.sleep(2)
    webbrowser.open("http://localhost:8000")

    backend_thread.join()
    frontend_thread.join()