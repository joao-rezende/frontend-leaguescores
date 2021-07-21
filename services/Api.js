
export default function Api() {
  const api = {};

  api.get = async function (url) {
    const res = await fetch(url, { method: 'GET' } );
    return await res.json();    
  };

  api.post = async function (url, data) {
    const res = await fetch(
      url,
      {
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }
    );

    return await res.json();
  };

  api.put = async function (url, data) {
    const res = await fetch(
      url,
      {
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT'
      }
    );

    return await res.json();
  };

  return api;
}