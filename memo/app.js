const ENCODED_API_KEY = 'API_KEY_HERE';
const API_KEY = atob(ENCODED_API_KEY);

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

function generateContent() {
    $('#loading').show();
    $('#content').empty();
    $('#refreshButton').prop('disabled', true);

    const prompt = `ランダムな日本語を作成し、その日本語に対して意味は同じだが言い回しが異なる英文を5つ作成して欲しい。
出来上がった英文に日本語訳を付けて1つ目の英文と比較してどこが違うのか解説する。
この際、英語の熟語についての使い方を説明に盛り込む。
使用した熟語のうちひとつを選択して英文の穴埋め問題を作成し、最後に正解を記載する。
回答はMarkdown形式で提供するものとし熟語を強調文字にする。
但し、穴埋め問題については熟語を太文字にはしない。
'''
----

## 日本語

日本語

----

### No.1

- 英文: 
- 日本語訳: 
- 熟語の説明: 

----

### No.2

- 英文: 
- 日本語訳: 
- 熟語の説明: 

----

### No.3

- 英文: 
- 日本語訳: 
- 熟語の説明: 

----

### No.4

- 英文: 
- 日本語訳: 
- 熟語の説明: 

----

### No.5

- 英文: 
- 日本語訳: 
- 熟語の説明: 

----

## 穴埋め問題

- 問題: 
- 選択肢: 
  1. 
  2. 
  3. 
  4. 
  5.

<br>
<br>
<br>
<br>
<br>

- 正解: 
- 解説: 
'''`;

    $.ajax({
        url: `${API_URL}?key=${API_KEY}`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        }),
        success: function(response) {
            const markdownContent = response.candidates[0].content.parts[0].text;
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
