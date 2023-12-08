import classes from './AccountSettingsForm.module.css';

const AccountSettingsForm: React.FC = () => {
    return (
        <div className={classes.form}>
            <button>Account Settings</button>
            <div>
                <div>
                    <button>Change email</button>
                </div>
                <div>
                    <button>Change password</button>
                </div>
            </div>
        </div>
    );
};

export default AccountSettingsForm;