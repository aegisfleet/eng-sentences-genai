const API_KEY = 'API_KEY_HERE';
const API_URL = 'https://api.dify.ai/v1';

function generateContent() {
  $('#loading').show();
  $('#content').empty();
  $('#refreshButton').prop('disabled', true);

  $.ajax({
    url: `${API_URL}/workflows/run`,
    type: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      "inputs": {},
      "response_mode": "blocking",
      "user": "eng-sentences-genai"
    }),
    success: function(response) {
        const markdownContent = response.data.outputs.text;
        const htmlContent = marked(markdownContent);
        $('#content').html(htmlContent);
        $('#loading').hide();
        $('#refreshButton').prop('disabled', false);
    },
    error: function(xhr, status, error) {
        $('#content').html('<p>エラーが発生しました。もう一度お試しください。</p>');
        $('#loading').hide();
        $('#refreshButton').prop('disabled', false);
        console.error('Error:', error);
    }
  });
}

$(document).ready(function() {
  generateContent();

  $('#refreshButton').on('click', function() {
    generateContent();
  });
});
