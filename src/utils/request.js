const API_DOMAIN = "http://luuninh.somee.com/api/"

export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path);
  const result = await response.json();
  return result;
}

export const post = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(options)
  })
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Lỗi API:", errorText);
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export const del = async (path) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "DELETE"
  });
  const result = await response.status;
  return result;
}

export const patch = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(options)
  });
  const result = await response.status;
  return result;
}

export const put = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(options)
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Lỗi API:", errorText);
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export const postFormData = async (path, formData) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "*/*",
    },
    body: formData,
  });

  const result = await response.json();
  return result;
};

