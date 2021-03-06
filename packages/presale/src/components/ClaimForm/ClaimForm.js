import React, { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useContractContext } from 'contexts/ContractContext';
import TextInput from 'components/TextInput';
import ContentBox from 'components/ContentBox';
import ToastContent from 'components/ToastContent';
import contractConfig from 'config/contract.json';
import { Button } from './ClaimForm.style';

const ClaimForm = () => {
  const {
    values: { tokenToClaim, claimTime, isClaimed, canClaim },
    methods: { claimTokens },
  } = useContractContext();

  useEffect(() => {
    console.log('=== TOKEN TO CLAIM: ', tokenToClaim);
    console.log('=== CAN CLAIM: ', canClaim);
  }, [canClaim, tokenToClaim]);

  const handleClimButtonClick = useCallback(() => {
    if (claimTokens) {
      let toastId = null;

      claimTokens((error, transaction) => {
        if (error) {
          toast(error?.message || error, { type: 'error', autoClose: 10000 });
        } else {
          toastId = toast(
            <ToastContent
              message="Transaction is in progress"
              link={`${contractConfig.transactionBaseAddress}/${transaction}`}
              isLoading
            />,
            {
              type: 'success',
              autoClose: false,
            }
          );
        }
      })
        .then(({ transactionHash }) => {
          toast.dismiss(toastId);

          toast(
            <ToastContent
              message="Transaction successful"
              link={`${contractConfig.transactionBaseAddress}/${transactionHash}`}
            />,
            { type: 'success', autoClose: false }
          );
        })
        .catch((error) => {
          toast.dismiss(toastId);

          toast(error.message, { type: 'error', autoClose: false });
        });
    }
  }, [claimTokens]);

  return (
    <ContentBox title="Claim POR Token">
      <div className="input-group mt-4">
        <TextInput
          type="text"
          className="dark-input w-100 mt-2"
          readOnly
          value={isClaimed ? 0 : tokenToClaim}
        />
      </div>
      {canClaim || isClaimed ? (
        <p className="text-muted mt-3">&nbsp;</p>
      ) : (
        <p className="text-muted mt-3" style={{ fontSize: 12 }}>
          You Can Claim your Tokens After: <b id="claimTokenDate">{claimTime}</b>
        </p>
      )}
      <Button
        disabled={!canClaim || !tokenToClaim}
        className="btn btn-primary buy-button claim-max-button w-100 py-3"
        onClick={handleClimButtonClick}
      >
        {isClaimed ? 'Already Claimed' : 'Claim POR Tokens'}
      </Button>
    </ContentBox>
  );
};

export default ClaimForm;
