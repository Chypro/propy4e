import pandas as pd
from googletrans import Translator

# Function to translate a longer piece of text
def translate_long_text(input_text, target_language):
    # Initialize the Translator
    translator = Translator()

    # Split the input_text into smaller chunks (e.g., sentences or paragraphs)
    # We can also customize the chunk size based on our needs
    chunk_size = 1000  # Maximum characters per chunk
    chunks = [input_text[i:i+chunk_size] for i in range(0, len(input_text), chunk_size)]

    # Translate each chunk to the target language
    translated_chunks = [translator.translate(chunk, dest=target_language).text for chunk in chunks]

    # Combine the translated chunks into a single translated text
    translated_text = ' '.join(translated_chunks)

    return translated_text

# Input text (e.g., the content of a page in our PIM system)
input_text = """
This is a sample text that represents the content of a page in your PIM system.
It can be multiple paragraphs, and it might contain a lot of information.
"""

target_language = "ja"  # Replace with the language code we want

# Call the function to translate the entire page
translated_text = translate_long_text(input_text, target_language)
print(translated_text)
