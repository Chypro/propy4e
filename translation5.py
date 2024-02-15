from docx import Document
import openai
from config import OPENAI_API_KEY  # Import the API key from config.py

# Set OpenAI API key from the config file
openai.api_key = OPENAI_API_KEY

def extract_text_from_docx(docx_file):
    doc = Document(docx_file)
    text = []
    for paragraph in doc.paragraphs:
        text.append(paragraph.text)
    return '\n'.join(text)

def split_text_into_chunks(text, chunk_size=1000):
    chunks = [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]
    return chunks

def translate_long_text(input_text):
    translated_chunks = []

    # Split the input_text into smaller chunks (sentences, paragraphs, etc.)
    # Customize the chunk size based on the requirements
    chunk_size = 1000  # Maximum characters per chunk
    chunks = [input_text[i:i + chunk_size] for i in range(0, len(input_text), chunk_size)]

    # Translate each chunk to English
    for chunk in chunks:
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=f"Translate the following Japanese text to English: '{chunk}'",
            max_tokens=200  # Adjust token limit as needed; initially 50
        )
        translated_chunks.append(response.choices[0].text)

    # Combine the translated chunks into a single translated text
    translated_text = ' '.join(translated_chunks)

    return translated_text

# Function to translate a Word document
def translate_word_document(docx_file):
    # Extract text from Word document
    input_text = extract_text_from_docx(docx_file)

    # Split the text into chunks
    chunks = split_text_into_chunks(input_text)

    # Translate and store each chunk
    translated_chunks = []
    for chunk in chunks:
        translated_chunk = translate_long_text(chunk)
        translated_chunks.append(translated_chunk)

    # Combine translated chunks into the translated document
    translated_document = '\n'.join(translated_chunks)

    return translated_document

# Ask the user for the document path
docx_file = input("Enter the path to the Word document (e.g., /path/to/document.docx): ")

# Translate the document
translated_document = translate_word_document(docx_file)
print(translated_document)
