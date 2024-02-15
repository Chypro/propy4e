import openai
from config import OPENAI_API_KEY  # Import the API key from config.py

# Set OpenAI API key from the config file
openai.api_key = OPENAI_API_KEY

def correct_spelling_and_grammar(text_with_errors):
    # Call the OpenAI API to correct the text using GPT-3.5 (LLM)
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"Correct the following text for spelling and grammar errors in Japanese: '{text_with_errors}'",
        max_tokens=1000  # You can adjust this based on the response length you desire
    )

    # Extract the corrected text from the API response
    corrected_text = response.choices[0].text

    return corrected_text

# Example usage:
text_with_errors = """新しいiPhone - テクノロジーの未来への一歩

最新のiPoneは、革命的なテクノロジーと洗練されたデザインを融合した究極のスマートフォーンです。驚くほど美しいディスプレーは、鮮やかな色彩とクリアな解像度で映像や写真を蘇らせ、あなたの視界を飛躍的に広げます。

主な特徴:

Aシリーズチッップ: 最新のAシリーズチッップは、高速なパフォーマンスとエネルギー効率を提供し、あらゆるタスクに対応します。

カメラ革命: ダイナミックな写真や4Kビデオ撮影を可能にするカメラシステムで、あなたのクリエィティビティを解き放ちます。

iOS: iOSは洗練された操作性とセキュリティを提供し、App Storeで数多くのアッリとサービスを利用できます。

デザィン: 高品質の素材とシンプルなデザィンで、美しさと耐久性を両立。

Face ID: 顔認証技術で、最高水準のセキュリティと便利さを実現。"""


corrected_text = correct_spelling_and_grammar(text_with_errors)

# Print the corrected text
print("Original text:", text_with_errors)
print("Corrected text:", corrected_text)
