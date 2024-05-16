import { Form, useActionData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "util/auth-context";
import {
	SettingsBtnSave,
	SettingsForm,
	SettingsBtnSelect,
	SettingsBtnsSelect,
	SettingsHeader,
	FlexboxRow,
} from "util/common_styles";
import { SettingsInputLabelCombo } from "util/common_components";

const AccountSettingsForm: React.FC = () => {
	const [changeEmail, setChangeEmail] = useState(true);
	const [changePassword, setChangePassword] = useState(false);
	const data: any = useActionData();

	const { userInfo, updateUserInfo } = useContext(AuthContext);
	// const userData = userContext.userInfo as User;

	useEffect(() => {
		if (data && data.ok) {
			// const updateUser = userContext.updateUserInfo;
			// console.log("data", data);
			const email = data.data.newEmail ?? userInfo!.email;
			const password = data.data.newPassword ?? userInfo!.password;
			updateUserInfo({ email, password }, userInfo);
		}
	}, [data, updateUserInfo, userInfo]);

	return (
		<SettingsForm>
			<SettingsHeader>What would you like to change?</SettingsHeader>
			{data &&
				data.errorMessage &&
				((changeEmail && data.type === "email") ||
					(changePassword && data.type === "password")) && (
					<SettingsHeader style={{ color: "orange" }}>
						{data.errorMessage}
					</SettingsHeader>
				)}
			{data &&
				data.successMessage &&
				((changeEmail && data.type === "email") ||
					(changePassword && data.type === "password")) && (
					<SettingsHeader style={{ color: "green" }}>
						{data.successMessage}
					</SettingsHeader>
				)}
			<FlexboxRow style={{ border: "1px solid var(--color-gray-700)" }}>
				<SettingsBtnsSelect>
					<SettingsBtnSelect
						onClick={() => {
							changePassword && setChangeEmail(true);
							setChangePassword(false);
						}}
						$selected={changeEmail ?? false}
					>
						Update Email Address
					</SettingsBtnSelect>
					<SettingsBtnSelect
						onClick={() => {
							changeEmail && setChangePassword(true);
							setChangeEmail(false);
						}}
						$selected={changePassword ?? false}
					>
						Update Password
					</SettingsBtnSelect>
				</SettingsBtnsSelect>
				{changeEmail && (
					<Form method="patch" style={{ width: "60%", padding: "0 20px" }}>
						<SettingsInputLabelCombo type="email" name="old Email" value="" />
						<SettingsInputLabelCombo type="email" name="new Email" value="" />
						<SettingsInputLabelCombo
							type="email"
							name="confirm New Email"
							value=""
						/>
						<SettingsBtnSave>
							<button name={"accountEmail"}>Save</button>
						</SettingsBtnSave>
					</Form>
				)}
				{changePassword && (
					<Form method="patch" style={{ width: "60%", padding: "0 20px" }}>
						<SettingsInputLabelCombo
							type="password"
							name="old Password"
							value=""
						/>
						<SettingsInputLabelCombo
							type="password"
							name="new Password"
							value=""
						/>
						<SettingsInputLabelCombo
							type="password"
							name="confirm New Password"
							value=""
						/>
						<SettingsBtnSave>
							<button name={"accountPassword"}>Save</button>
						</SettingsBtnSave>
					</Form>
				)}
			</FlexboxRow>
		</SettingsForm>
	);
};

export default AccountSettingsForm;
