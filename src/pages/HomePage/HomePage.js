import React, { useCallback, useMemo } from 'react';
import { Col, Container, ProgressBar, Row } from 'react-bootstrap';
import Header from 'components/Header';
import ContentBox from 'components/ContentBox';
import { useContractContext } from 'contexts/ContractContext';
import Price from 'components/Price';
import Input from 'components/Input';
import arrowDown from 'images/arrow-down.svg';
import { ClaimButton, Description } from './HomePage.style';

const HomePage = () => {
  const handleClaimButtonClick = useCallback(() => {
    alert('Claim Portoken');
  }, []);

  const {
    tokenPrice,
    hardCap,
    softCap,
    minInvest,
    maxInvest,
    totalTokens,
    tokensLeft,
    totalCollected,
    openTime,
    closeTime,
  } = useContractContext();

  const progress = useMemo(() => {
    return (tokensLeft / totalTokens).toFixed(2);
  }, [tokensLeft, totalTokens]);

  return (
    <Container className="pt-4">
      <Header />

      <Row>
        <Col>
          <ContentBox title="Goal">
            <Description className="text-muted mt-3 mb-0">
              To be among the top 100 coins by creating its own ecosystem and to reach the goal of 1
              billion dollars.
            </Description>

            <p className="mt-3 progress-text2 mb-0">{tokenPrice} BNB Per Token</p>
            <p className="mt-3 progress-text mb-0">{totalCollected} BNB Raised</p>

            <ProgressBar now={progress} label={`${progress}%`} striped variant="success" />

            <Row>
              <Col xs={6} md={4} lg={3}>
                <Price name={'Softcap'} price={`${softCap} BNB`} />
              </Col>
              <Col xs={6} md={4} lg={2}>
                <Price name={'Hardcap'} price={`${hardCap} BNB`} />
              </Col>
              <Col xs={6} md={4} lg={2}>
                <Price name={'Min Invest'} price={`${minInvest} BNB`} />
              </Col>
              <Col xs={6} md={4} lg={2}>
                <Price name={'Max Invest'} price={`${maxInvest} BNB`} />
              </Col>
              <Col xs={6} md={4} lg={3}>
                <Price name={'Open Time'} price={openTime} />
              </Col>

              <Col xs={6} md={4} lg={3}>
                <Price name={'Softcap'} price={`${softCap} BNB`} />
              </Col>
              <Col xs={6} md={4} lg={2}>
                <Price name={'Hardcap'} price={`${hardCap} BNB`} />
              </Col>
              <Col xs={6} md={4} lg={2}>
                <Price name={'Min Invest'} price={`${minInvest} BNB`} />
              </Col>
              <Col xs={6} md={4} lg={2}>
                <Price name={'Max Invest'} price={`${maxInvest} BNB`} />
              </Col>
              <Col xs={6} md={4} lg={3}>
                <Price name={'Close Time'} price={closeTime} />
              </Col>
            </Row>

            <p className="text-h1 mt-3 mb-0">Your Investment</p>
            <Row style={{ marginTop: '20px' }}>
              <Col xs={6} md={4}>
                <Price name={'Softcap'} price={'100 BNB'} />
                <ClaimButton className="btn" onClick={handleClaimButtonClick}>
                  Claim Portoken
                </ClaimButton>
              </Col>

              <Col xs={6} md={4}>
                <Price name={'Softcap'} price={'100 BNB'} />
                <ClaimButton className="btn" onClick={handleClaimButtonClick}>
                  Claim Portoken
                </ClaimButton>
              </Col>

              <Col xs={6} md={4}>
                <Price name={'Softcap'} price={'100 BNB'} />
                <ClaimButton className="btn" onClick={handleClaimButtonClick}>
                  Claim Portoken
                </ClaimButton>
              </Col>
            </Row>
            {/* eslint-disable-next-line max-len */}
            {/* <span class="text-warning "> Please first get your airdrop reward. If you buy token first you can't join Airdrop</span>*/}
            {/* eslint-disable-next-line max-len */}
            {/*<ReferralInput type="text" id="airinput" readonly value="0x32a33b6cd2Ffc7ccfDfC40aaFb87f6Eb1B31651e" class="input-group refferal-input py-2" />*/}
          </ContentBox>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col sm={12} md={12} lg={6}>
          <ContentBox title="Buy Portoken">
            <div className="input-group mt-4">
              <Input
                type="number"
                className="w-100 mt-2"
                placeholder="0.1 BNB"
                defaultValue="0.1"
              />
              <img
                src={arrowDown}
                className="mx-auto justify-content-center mt-3"
                width="35px"
                alt=""
              />
              <Input
                type="text"
                className="w-100 mt-3"
                readOnly
                placeholder="149253.73134328358 PORT"
              />
            </div>
            <button className="btn btn-primary buy-button w-100 py-3 ">Buy Portoken</button>
          </ContentBox>
        </Col>
        <Col sm={12} md={12} lg={6}>
          <ContentBox title="Claim PORT Token">
            <div className="input-group mt-4">
              <Input type="text" className="dark-input w-100 mt-2" readOnly defaultValue={0} />
            </div>
            <p className="text-muted mt-3">
              You Can Claim your Tokens After: <b id="claimTokenDate" />
            </p>
            <button className="btn btn-primary buy-button claim-max-button w-100 py-3 ">
              Claim PORT Tokens
            </button>
          </ContentBox>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
