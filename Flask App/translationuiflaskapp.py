from flask import Flask, render_template, request
from docx import Document
from config import OPENAI_API_KEY
import openai

# Set up Flask
app = Flask(__name__, template_folder='/Users/profielddev/Desktop/profield/chypro/Flask App/template')

# Set OpenAI API key from the config file
openai.api_key = OPENAI_API_KEY

def translate_word_document(docx_file):
    doc = Document(docx_file)
    text = []
    for paragraph in doc.paragraphs:
        text.append(paragraph.text)
    input_text = '\n'.join(text)

    # Set OpenAI API key
    openai.api_key = OPENAI_API_KEY

    # Translate the input_text using OpenAI's API
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"Translate the following Japanese text to English: '{input_text}'",
        max_tokens=200  # Adjust token limit as needed; initially 50
    )

    # Extract the translated text from the API response
    translated_text = response.choices[0].text

    return translated_text

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Handle the form submission
        docx_file = request.files['docx_file']
        if docx_file:
            # Translate the document
            translated_text = translate_word_document(docx_file)
            # Return the translated text to the user
            return render_template('translationui.html', translated_text=translated_text)

    # Render the initial form
    return render_template('translationui.html')

if __name__ == '__main__':
    app.run(debug=True)
