from flask import Flask, render_template, send_from_directory, request, jsonify
from flask_mail import Mail, Message
import os

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  # Disable caching

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'melisa.kac98@gmail.com'  # Your Gmail address
app.config['MAIL_PASSWORD'] = os.getenv('GMAIL_APP_PASSWORD')  # Your Gmail app-specific password
app.config['MAIL_DEFAULT_SENDER'] = 'melisa.kac98@gmail.com'

mail = Mail(app)

@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        # Create and send email
        msg = Message(
            subject=f'New Portfolio Contact: {name}',
            recipients=['melisa.kac98@gmail.com'],
            body=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        )
        mail.send(msg)
        
        return jsonify({'success': True, 'message': 'Email sent successfully'}), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/')
def index():
    return render_template('index.html', portfolio_items=portfolio_items, portfolio_dir=PORTFOLIO_DIR)

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(debug=True)

# Get list of image files in portfolio directory
PORTFOLIO_DIR = os.path.join('static', 'portfolio')
image_files = [f for f in os.listdir(PORTFOLIO_DIR) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]

# Portfolio items with all actual image filenames
portfolio_items = [
    {
        'title': 'Call Me Piggy',
        'date': '2024',
        'medium': 'Screenprint',
        'size': '50x70 cm',
        'description': 'A vibrant exploration of color and form',
        'image': 'portfolio/Callmepiggy.jpg'
    },
    {
        'title': 'Melysterious',
        'date': '2024',
        'medium': 'Photography',
        'size': '50x70 cm',
        'description': 'An intriguing piece of myself',
        'image': 'portfolio/Melysterious.jpg'
    },
    {
        'title': 'More Vleks',
        'date': '2024',
        'medium': 'Lithography',
        'size': '50x70 cm',
        'description': 'A detailed exploration of texture and pattern',
        'image': 'portfolio/Morevleks.jpg'
    },
    {
        'title': 'Naughty',
        'date': '2024',
        'medium': 'Monotype',
        'size': '50x70 cm',
        'description': 'A study in abstract patterns',
        'image': 'portfolio/Naughty.jpg'
    },
    {
        'title': 'Doek',
        'date': '2025',
        'medium': 'Zeefdruk op textiel',
        'size': '100x150 cm',
        'description': 'An abstract representation of a deer',
        'image': 'portfolio/Weirddoek.jpg'
    },
    {
        'title': 'Yujihound',
        'date': '2024',
        'medium': 'Etch',
        'size': '50x70 cm',
        'description': 'A playful take on animal imagery',
        'image': 'portfolio/Yujihound.jpg'
    }
]

@app.route('/')
def index():
    return render_template('index.html', portfolio_items=portfolio_items, portfolio_dir=PORTFOLIO_DIR)

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(debug=True)
