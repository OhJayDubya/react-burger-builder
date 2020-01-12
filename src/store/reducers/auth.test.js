import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return inital state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });

  it("should store token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/"
        },
        { type: actionTypes.AUTH_SUCCESS, idToken: "token", userId: "userId" }
      )
    ).toEqual({
      token: "token",
      userId: "userId",
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
});
