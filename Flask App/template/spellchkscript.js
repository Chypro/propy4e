function highlightDifferences(originalText, correctedText) {
    var originalWords = originalText.split(/\s+/);
    var correctedWords = correctedText.split(/\s+/);
    var highlightedText = '';
    for (var i = 0; i < originalWords.length; i++) {
        if (originalWords[i] !== correctedWords[i]) {
            highlightedText += '<span class="highlight">' + correctedWords[i] + '</span> ';
        } else {
            highlightedText += originalWords[i] + ' ';
        }
    }
    return highlightedText;
}

$(document).ready(function () {
    $('#spellcheck-form').submit(function (event) {
        event.preventDefault();

        var text = $('#text-input').val();
        $('#check-button').prop('disabled', true); // Disable the button during checking
        $('.loading').show(); // Show the loading indicator

        $.ajax({
            type: 'POST',
            url: '/',
            data: { text: text },
            success: function (response) {
                var correctedText = response.corrected_text;
                var originalText = text; // Store the original text
                var highlightedText = highlightDifferences(originalText, correctedText);
                $('#corrected-text').html(highlightedText);
                $('#check-button').prop('disabled', false); // Re-enable the button
                $('.loading'). hide(); // Hide the loading indicator
            }
        });
    });
});
