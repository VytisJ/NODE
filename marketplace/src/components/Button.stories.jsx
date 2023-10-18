import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
};

export const DefaultButton = () => <Button>Default button</Button>;

export const PrimaryButton = () => <Button primary>Primary button</Button>;

export const SecondaryButton = () => (
  <Button secondary>Secondary button</Button>
);
