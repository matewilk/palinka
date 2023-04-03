import * as React from "react";
import { render } from "@testing-library/react-native";
import { useAuth } from "@clerk/clerk-expo";
import { View, Text } from "react-native";

import AppNavigator from "./AppNavigator";

jest.mock("@clerk/clerk-expo", () => ({
  useAuth: jest.fn(),
}));

const HomeScreenMock = () => (
  <View>
    <Text>HomeScreenMock</Text>
  </View>
);
jest.mock("./MainStackNavigator", () => HomeScreenMock);

const SignInSignUpScreenMock = () => (
  <View>
    <Text>SignInSignUpScreenMock</Text>
  </View>
);
jest.mock("./AuthStackNavigator", () => SignInSignUpScreenMock);

describe("<App />", () => {
  it("Renders the sign in screen if not signed in", () => {
    (useAuth as jest.Mock).mockReturnValue({ isSignedIn: false });

    const { getByText } = render(<AppNavigator />);

    expect(getByText("SignInSignUpScreenMock")).toBeTruthy();
  });

  it("Renders the home screen if signed in", () => {
    (useAuth as jest.Mock).mockReturnValue({ isSignedIn: true });

    const { getByText } = render(<AppNavigator />);

    expect(getByText("HomeScreenMock")).toBeTruthy();
  });
});
