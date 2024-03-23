import Signup from "../../src/view/components/user/Signup";

const nameHelpSelector = "#register_name_help > .ant-form-item-explain-error";
const emailHelpSelector = "#register_email_help > .ant-form-item-explain-error";
const passwordHelpSelector =
  "#register_password_help > .ant-form-item-explain-error";
const confirmHelpSelector =
  "#register_confirm_help > .ant-form-item-explain-error";

describe("<Signup />", () => {
  it("renders", () => {
    cy.mount(<Signup />);
  });

  it("initial state", () => {
    cy.mount(<Signup />);
    cy.get("#register_name").should("have.value", "");
    cy.get("#register_email").should("have.value", "");
    cy.get("#register_password").should("have.value", "");
    cy.get("#register_confirm").should("have.value", "");
  });

  it("empty values", () => {
    cy.mount(<Signup />);

    cy.get("#register_name").should("have.value", "");
    cy.get("#register_email").should("have.value", "");
    cy.get("#register_password").should("have.value", "");
    cy.get("#register_confirm").should("have.value", "");

    cy.get("#signup_btn").click();

    cy.get(nameHelpSelector).should("have.text", "Please input your name!");
    cy.get(emailHelpSelector).should("have.text", "Please input your E-mail!");
    cy.get(passwordHelpSelector).should(
      "have.text",
      "Please input your password!"
    );
    cy.get(confirmHelpSelector).should(
      "have.text",
      "Please confirm your password!"
    );
  });

  it("invalid email value", () => {
    cy.mount(<Signup />);

    cy.get("#register_email").type("aaaaa");

    cy.get(emailHelpSelector).should(
      "have.text",
      "The input is not valid E-mail!"
    );
  });

  it("invalid password value", () => {
    cy.mount(<Signup />);

    cy.get("#register_password").type("aaaaa");

    cy.get(passwordHelpSelector).should(
      "have.text",
      "Minimum 8 characters, at least 1 letter and 1 number"
    );
  });

  it("invalid confirm password value", () => {
    cy.mount(<Signup />);

    cy.get("#register_password").type("aaaaaaa1");
    cy.get("#register_confirm").type("aaaaaaa");

    cy.get(confirmHelpSelector).should(
      "have.text",
      "The password do not match!"
    );
  });

  it("valid values", () => {
    cy.mount(<Signup />);

    cy.get("#register_name").type("Test");
    cy.get("#register_email").type("test@gmail.com");
    cy.get("#register_password").type("aaaaaaa1");
    cy.get("#register_confirm").type("aaaaaaa1");

    cy.get("#signup_btn").click();

    cy.get(nameHelpSelector).should("not.exist");
    cy.get(emailHelpSelector).should("not.exist");
    cy.get(passwordHelpSelector).should("not.exist");
    cy.get(confirmHelpSelector).should("not.exist");
  });
});
