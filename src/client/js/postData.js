export const sendData = async data => {
  const request = await fetch('http://localhost:3003/add_data', {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await request.json();
};
