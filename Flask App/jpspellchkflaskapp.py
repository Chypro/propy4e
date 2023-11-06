#Module for Japanese Spelling and Grammatical Error
from flask import Flask, render_template, request, jsonify
import openai
from sudachipy import Dictionary
from config import OPENAI_API_KEY

app = Flask(__name__, template_folder='template')

# Set OpenAI API key
openai.api_key = OPENAI_API_KEY

@app.route('/', methods=['GET', 'POST'])

def index():
    if request.method == 'POST':
        text_with_errors = request.form['text']
        if text_with_errors:
            corrected_text = correct_spelling_and_grammar(text_with_errors)
            return jsonify(corrected_text=corrected_text)
    
    return render_template('jpspellchkuihylytlsttry.html')


def correct_spelling_and_grammar(text_with_errors):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"Correct the following text for spelling and grammar errors in Japanese: '{text_with_errors}'",
        max_tokens=1000  # Adjust this based on the response length
    )

    corrected_text = response.choices[0].text

    # Split the original and corrected text into words
    original_words = text_with_errors.split()
    corrected_words = corrected_text.split()

    # Create an empty list for the highlighted words
    highlighted_words = []

    for original_word, corrected_word in zip(original_words, corrected_words):
        if original_word != corrected_word:
            # Highlight the corrected word with a span element
            highlighted_word = f'<span class="highlight">{corrected_word}</span>'
        else:
            highlighted_word = corrected_word
        highlighted_words.append(highlighted_word)

    # Join the highlighted words back into a single string
    highlighted_text = ' '.join(highlighted_words)

    return highlighted_text

if __name__ == '__main__':
    app.run(debug=True)
