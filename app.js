const form = document.getElementById('form');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const website = document.getElementById('website').value;

  const result = await analyze(website);
  addInfo(result);
});

async function analyze(searchUrl) {
  const url = 'http://api.thegreenwebfoundation.org/greencheck/' + searchUrl;
  const res = await fetch(url);
  const data = await res.json();

  console.log(data);
  if (data.error) {
    data.url = searchUrl;
    return false;
  }
  if (data.data) return data;
}

function addInfo(info) {
  const resultDiv = document.getElementById('results');
  if (!info) {
    const errorText = `<h2>Showing results for ${info.url}</h2>
      <h2>Sorry that websit could not be analyzed. Please check spelling (should be formatted as www.example.com).</h2>`;
    resultDiv.innerHTML = errorText;
  } else {
    const resultTemplate = `
    <h2>Showing results for ${info.url}</h2>
        <h2>${
          info.green
            ? 'This website is green!'
            : 'Unfortunately this website is not green...'
        }</h2>
        ${
          info.hostedby
            ? `<h2>The website is hosted by ${info.hostedby}</h2>`
            : ''
        }
      `;
    resultDiv.innerHTML = resultTemplate;
    resultDiv.classList.add('results');
  }
}
