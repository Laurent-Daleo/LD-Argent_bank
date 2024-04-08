import React from 'react';

const AccountElement = ({ account }) => {
    return (
        <section className="account">
            <div className="account_content_wrapper">
                <h3 className="acount_title">
                    {account.name} ({account.number})
                </h3>
                <p className="account_amout">
                    {account.balance}
                </p>
                <p className="account_description">
                    {account.description}
                </p>
            </div>
            <button className="transaction_btn">
                View transaction
            </button>
        </section>
    );
};

export default AccountElement;