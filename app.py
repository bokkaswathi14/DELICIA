from flask import Flask, request, jsonify
from flask_cors import CORS
from recipe_scrapers import scrape_me

app = Flask(__name__)
CORS(app)  # Allows requests from your React frontend

@app.route('/')
def home():
    return "Flask server is running"


@app.route('/api/scrape', methods=['POST'])
def scrape_recipe():
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({'error': 'No URL provided'}), 400

    try:
        scraper = scrape_me(url)

        recipe = {
            'title': scraper.title(),
            'image': scraper.image(),
            'ingredients': scraper.ingredients(),
            'instructions': scraper.instructions(),
            'total_time': scraper.total_time(),
            'yields': scraper.yields(),
            'host': scraper.host(),
            'nutrients': scraper.nutrients() if hasattr(scraper, 'nutrients') else {},
        }

        return jsonify(recipe)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
