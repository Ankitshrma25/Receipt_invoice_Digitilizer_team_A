const API_URL = "http://localhost:8000";

export const api = {

  // REGISTER
  register: async (data) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: data.name,
        user_email: data.email,
        user_password: data.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw { response: { data: result } };
    }

    return result;
  },

  // LOGIN
  login: async (data) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_email: data.email,
        user_password: data.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw { response: { data: result } };
    }

    return result;
  },

  // GOOGLE LOGIN
  googleLogin: async (data) => {
    const response = await fetch(`${API_URL}/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: data.token,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw { response: { data: result } };
    }

    return result;
  },

  // FORGOT PASSWORD
  forgotPassword: async (data) => {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_email: data.email,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw { response: { data: result } };
    }

    return result;
  },

  // RESET PASSWORD
  resetPassword: async (data) => {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: data.token,
        new_password: data.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw { response: { data: result } };
    }

    return result;
  },

  // UPLOAD INVOICE
  uploadInvoice: async (file, token) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/invoice/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw { response: { data: result } };
    }

    return result;
  },

  // GET ALL INVOICES (ADMIN)
  getAllInvoices: async (token) => {
    const response = await fetch(`${API_URL}/invoice/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw { response: { data: result } };
    }

    return result;
  },
};