import Auth from "@aws-amplify/auth";
export const BASE_URL = process.env.REACT_APP_API_URL;

export const guestHeaders = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const guestHeadersMultiPart = {
  headers: {
    Accept: "application/json",
    "Content-Type": 'multipart/form-data',
  },
};

export const authHeaders = (idToken: string = "") => {
  return {
    headers: {
      ...guestHeaders.headers,
      Authorization: `${`Bearer ` + (idToken ? idToken : (localStorage.getItem("userIdToken") ? localStorage.getItem("userIdToken") : ""))
        }`,
    },
  };
};

export const authHeadersWithMultiPart = (idToken: string = "") => {
  return {
    headers: {
      ...guestHeadersMultiPart.headers,
      Authorization: `${`Bearer ` + (idToken ? idToken : (localStorage.getItem("userIdToken") ? localStorage.getItem("userIdToken") : ""))
        }`,
    },
  };
};

export const methodProps = (method: string, input?: any) => {
  switch (method) {
    case "GET":
      return {
        method,
      };
    case "POST":
      return {
        method: "POST",
        body: JSON.stringify(input),
      };
    case "PUT":
      return {
        method: "PUT",
        body: JSON.stringify(input)
      }
    case "PUT_FORM":
      return {
        method: "PUT",
        body: input
      }
    default:
      return {
        method: "GET",
      };
  }
};

export const refreshAuthToken = async () => {
  return await new Promise((resolve, reject) => {
    Auth.currentSession()
      .then((user) => {
        localStorage.setItem("userIdToken", user?.getIdToken()?.getJwtToken());
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const refreshAuth = async () => {
  return await refreshAuthToken()
    .then((user: any) => {
      return user;
    })
    .catch((err) => {
      Auth.signOut();
      // window.location.reload();
    });
};
