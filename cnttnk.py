from tiktoken import Tokenizer

# Define Japanese text
japanese_text = "日本語、または日本のスクリプトでの「日本語」は、豊かな歴史と深い文化的意義を持つ、魅力的でユニークな言語です。これは、日本国内での主要なコミュニケーション手段として機能し、豊かな文化遺産、先進的なテクノロジー、そして活気あるポップカルチャーで知られる国、日本で使用されています。日本語は、複雑な表記体系であることで有名で、漢字、中国から派生した文字、ひらがな、日本語の言葉に使用される音節文字、カタカナ、主に外来語やオノマトペなどに使用される別の音節文字の3つのスクリプトを組み合わせています。さらに、日本語の文法と構文は、印欧洲語とは大きく異なり、学習が難しい言語としての評判を築いています。その難しさにもかかわらず、日本語を学ぶことは、日本の豊かな文学、伝統的な芸術、そして現代メディアを探求するためのゲートウェイを提供し、言語愛好家にとってエキサイティングな旅路となります。"

# Initialize the tokenizer with your text
tokenizer = Tokenizer()
tokenizer.from_str(japanese_text)

# Count the tokens
token_count = len(list(tokenizer))
print("Token count:", token_count)
