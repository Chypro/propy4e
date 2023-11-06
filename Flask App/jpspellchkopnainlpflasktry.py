# Module for Japanese Spelling and Grammatical Error
from flask import Flask, render_template, request, jsonify
import openai
from sudachipy import Dictionary
from config import OPENAI_API_KEY

app = Flask(__name__, template_folder='template')

# Set OpenAI API key
openai.api_key = OPENAI_API_KEY

# Initialize SudachiPy dictionary
dictionary = Dictionary().create()

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

    # Tokenize the original and corrected text using SudachiPy
    original_tokens = dictionary.tokenize(text_with_errors)
    corrected_tokens = dictionary.tokenize(corrected_text)

    # Create an empty list for the highlighted tokens
    highlighted_tokens = []

    for original_token, corrected_token in zip(original_tokens, corrected_tokens):
        if original_token.surface() != corrected_token.surface():
            # Highlight the corrected token with a span element
            highlighted_token = f'<span class="highlight">{corrected_token.surface()}</span>'
        else:
            highlighted_token = corrected_token.surface()
        highlighted_tokens.append(highlighted_token)

    # Join the highlighted tokens back into a single string
    highlighted_text = ''.join(highlighted_tokens)

    return highlighted_text

if __name__ == '__main__':
    app.run(debug=True)
