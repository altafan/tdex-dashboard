import './feeForm.less';
import { InfoCircleOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Divider, Form, Button, notification, Popover } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';

import type { RootState } from '../../../../app/store';
import { useTypedSelector } from '../../../../app/store';
import { CurrencyIcon } from '../../../../common/CurrencyIcon';
import { InputAmount } from '../../../../common/InputAmount';
import { MarketIcons } from '../../../../common/MarketIcons';
import { RestartMarketModal } from '../../../../common/RestartMarketModal';
import type { Asset } from '../../../../domain/asset';
import {
  formatFiatToSats,
  formatLbtcUnitToSats,
  fromSatsToUnitOrFractional,
  isLbtcAssetId,
  isLbtcTicker,
  sleep,
} from '../../../../utils';
import {
  useCloseMarketMutation,
  useGetMarketInfoQuery,
  useOpenMarketMutation,
  useUpdateMarketFixedFeeMutation,
  useUpdateMarketPercentageFeeMutation,
} from '../../operator.api';

const { Title } = Typography;

interface IFormInputs {
  feeAbsoluteBaseInput: string;
  feeAbsoluteQuoteInput: string;
  feeRelativeInput: string;
}

interface FeeFormProps {
  baseAsset: Asset;
  quoteAsset: Asset;
  feeAbsoluteBase?: string;
  feeAbsoluteQuote?: string;
  feeRelative?: string;
  className?: string;
  incrementStep?: () => void;
  marketInfoRefetch?: () => void;
}

const FEE_ABSOLUTE_BASE_DEFAULT = '0';
const FEE_ABSOLUTE_QUOTE_DEFAULT = '0';
const FEE_RELATIVE_DEFAULT = '25';

export const FeeForm = ({
  baseAsset,
  quoteAsset,
  className,
  incrementStep,
  feeAbsoluteBase = FEE_ABSOLUTE_BASE_DEFAULT,
  feeAbsoluteQuote = FEE_ABSOLUTE_QUOTE_DEFAULT,
  feeRelative = FEE_RELATIVE_DEFAULT,
  marketInfoRefetch,
}: FeeFormProps): JSX.Element => {
  const { lbtcUnit, network } = useTypedSelector(({ settings }: RootState) => settings);
  const [form] = Form.useForm<IFormInputs>();
  const [openMarket] = useOpenMarketMutation();
  const [closeMarket] = useCloseMarketMutation();
  const [updateMarketPercentageFee] = useUpdateMarketPercentageFeeMutation();
  const [updateMarketFixedFee] = useUpdateMarketFixedFeeMutation();
  const { data: marketInfo } = useGetMarketInfoQuery({
    baseAsset: baseAsset.asset_id,
    quoteAsset: quoteAsset.asset_id,
  });
  const baseAssetUnitOrTicker = isLbtcAssetId(baseAsset.asset_id, network) ? lbtcUnit : baseAsset.ticker;
  const quoteAssetUnitOrTicker = isLbtcAssetId(quoteAsset.asset_id, network) ? lbtcUnit : quoteAsset.ticker;
  const [isFeeFormLocked, setIsFeeFormLocked] = useState<boolean>(true);
  const [isRestartMarketModalVisible, setIsRestartMarketModalVisible] = useState<boolean>(false);

  const saveAndRestart = async () => {
    try {
      // Pause Market
      const resClose = await closeMarket({
        baseAsset: marketInfo?.market?.baseAsset || '',
        quoteAsset: marketInfo?.market?.quoteAsset || '',
      });
      if ('error' in resClose) throw new Error((resClose as any).error);
      //
      const values = await form.validateFields();
      const updateMarketPercentageFeeRes = await updateMarketPercentageFee({
        basisPoint: Number(values.feeRelativeInput) * 100,
        market: { baseAsset: baseAsset.asset_id, quoteAsset: quoteAsset.asset_id },
      });
      // @ts-ignore
      if (updateMarketPercentageFeeRes?.error) throw new Error(updateMarketPercentageFeeRes?.error);
      const updateMarketFixedFeeRes = await updateMarketFixedFee({
        fixedFee: {
          baseFee: isLbtcAssetId(baseAsset.asset_id, network)
            ? Number(formatLbtcUnitToSats(Number(values.feeAbsoluteBaseInput), lbtcUnit))
            : Number(formatFiatToSats(Number(values.feeAbsoluteBaseInput))),
          quoteFee: isLbtcAssetId(quoteAsset.asset_id, network)
            ? Number(formatLbtcUnitToSats(Number(values.feeAbsoluteQuoteInput), lbtcUnit))
            : Number(formatFiatToSats(Number(values.feeAbsoluteQuoteInput))),
        },
        market: { baseAsset: baseAsset.asset_id, quoteAsset: quoteAsset.asset_id },
      });
      // @ts-ignore
      if (updateMarketFixedFeeRes?.error) throw new Error(updateMarketFixedFeeRes?.error);
      incrementStep?.();
      notification.success({ message: 'Market fees updated successfully' });
      // Re-open market
      const resOpen = await openMarket({
        baseAsset: marketInfo?.market?.baseAsset || '',
        quoteAsset: marketInfo?.market?.quoteAsset || '',
      });
      if ('error' in resOpen) throw new Error((resOpen as any).error);
      setIsFeeFormLocked(true);
      setIsRestartMarketModalVisible(false);
      //
      await sleep(500);
      marketInfoRefetch?.();
    } catch (err) {
      // @ts-ignore
      notification.error({ message: err.message });
    }
  };

  const resetAll = async () => {
    if (!marketInfo?.fee?.fixed) return;
    form.setFieldsValue({
      feeAbsoluteBaseInput: fromSatsToUnitOrFractional(
        marketInfo.fee.fixed.baseFee,
        baseAsset.precision,
        isLbtcTicker(baseAsset.ticker),
        lbtcUnit
      ),
      feeAbsoluteQuoteInput: fromSatsToUnitOrFractional(
        marketInfo.fee.fixed.quoteFee,
        quoteAsset.precision,
        isLbtcTicker(quoteAsset.ticker),
        lbtcUnit
      ),
      feeRelativeInput: String(marketInfo.fee.basisPoint / 100),
    });
    setIsFeeFormLocked(true);
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="fee_form"
        initialValues={{
          feeAbsoluteBaseInput: fromSatsToUnitOrFractional(
            Number(feeAbsoluteBase),
            baseAsset.precision,
            isLbtcTicker(baseAsset.ticker),
            lbtcUnit
          ),
          feeAbsoluteQuoteInput: fromSatsToUnitOrFractional(
            Number(feeAbsoluteQuote),
            quoteAsset.precision,
            isLbtcTicker(quoteAsset.ticker),
            lbtcUnit
          ),
          feeRelativeInput: Number(feeRelative) / 100,
        }}
        className={className}
      >
        <div
          className={classNames('panel panel__grey', { locked: isFeeFormLocked, unlocked: !isFeeFormLocked })}
        >
          <Row>
            <Col span={24}>
              <Title className="dm-sans dm-sans__x dm-sans__bold dm-sans__grey d-inline mr-4" level={3}>
                Set Absolute Fee
              </Title>
              <Popover
                trigger={['hover', 'click']}
                content="Absolute fees are fixed fees that are charged as a fixed amount in the asset on the way in. For example, if the swap is from USDT to BTC and the fixed fee is 0.01 BTC, the trader will be charged 0.01 BTC for the swap, regardless of the overall value of the swap."
              >
                <InfoCircleOutlined className="grey" />
              </Popover>
            </Col>
          </Row>
          <Row align="middle">
            <Col span={12} className="d-flex align-center">
              <CurrencyIcon assetId={baseAsset.asset_id} />
              <span className="dm-sans dm-sans__xx ml-2">{baseAssetUnitOrTicker}</span>
            </Col>
            <Col span={12}>
              <InputAmount
                disabled={isFeeFormLocked}
                assetPrecision={baseAsset.precision}
                formItemName="feeAbsoluteBaseInput"
                lbtcUnitOrTicker={baseAssetUnitOrTicker}
                setInputValue={(value) => form.setFieldsValue({ feeAbsoluteBaseInput: value })}
              />
            </Col>
          </Row>
          <Divider />
          <Row align="middle">
            <Col span={12} className="d-flex align-center">
              <CurrencyIcon assetId={quoteAsset.asset_id} />
              <span className="dm-sans dm-sans__xx ml-2">
                {isLbtcAssetId(quoteAsset.asset_id, network) ? lbtcUnit : quoteAsset.ticker}
              </span>
            </Col>
            <Col span={12}>
              <InputAmount
                disabled={isFeeFormLocked}
                assetPrecision={quoteAsset.precision}
                formItemName="feeAbsoluteQuoteInput"
                lbtcUnitOrTicker={quoteAssetUnitOrTicker}
                setInputValue={(value) => form.setFieldsValue({ feeAbsoluteQuoteInput: value })}
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col span={24}>
              <Title className="dm-sans dm-sans__x dm-sans__bold dm-sans__grey d-inline mr-4" level={3}>
                Set Relative Fee
              </Title>
              <Popover
                trigger={['hover', 'click']}
                content="Relative fees are fees that are charged as a percentage of the overall value of the swap. For example, if the swap is from USDT to BTC and the percentage fee is 0.1%, the trader will be charged 0.1% of the value of the swap in the asset on the way in. So if the swap is worth 100 USDT, the fee would be 0.1 USDT."
              >
                <InfoCircleOutlined className="grey" />
              </Popover>
            </Col>
          </Row>
          <Row align="middle" className="fee-relative-container">
            <Col span={16}>
              <MarketIcons baseAsset={baseAsset} quoteAsset={quoteAsset} size="medium" hasShadow={false} />
              <span className="dm-sans dm-sans__xx">
                {baseAsset.ticker}/{quoteAsset.ticker}
              </span>
            </Col>
            <Col span={8}>
              <InputAmount
                disabled={isFeeFormLocked}
                assetPrecision={2}
                formItemName="feeRelativeInput"
                lbtcUnitOrTicker=""
                setInputValue={(value) => form.setFieldsValue({ feeRelativeInput: value })}
                suffix="%"
              />
            </Col>
          </Row>
          <Row align="middle" className="fee-relative-btn-container">
            <Col span={24}>
              <Button
                className="mr-2"
                onClick={() => form.setFieldsValue({ feeRelativeInput: '0.25' })}
                disabled={isFeeFormLocked}
              >
                0.25%
              </Button>
              <Button
                className="mr-2"
                onClick={() => form.setFieldsValue({ feeRelativeInput: '3' })}
                disabled={isFeeFormLocked}
              >
                3%
              </Button>
              <Button
                onClick={() => form.setFieldsValue({ feeRelativeInput: '10' })}
                disabled={isFeeFormLocked}
              >
                10%
              </Button>
            </Col>
          </Row>
          <Row className="confirm-btn-container">
            <Col span={24}>
              {isFeeFormLocked ? (
                <>
                  <span className="dm-sans dm-sans__bold mr-2">Unlock to make changes</span>
                  <Button
                    onClick={() => setIsFeeFormLocked(false)}
                    className="lock-btn"
                    shape="circle"
                    icon={<LockOutlined />}
                    disabled={!isFeeFormLocked}
                  />
                </>
              ) : (
                <>
                  <span className="dm-sans dm-sans__bold mr-3">Lock to apply changes</span>
                  <Form.Item noStyle>
                    <Button
                      onClick={() => {
                        // If values have changed show modal
                        const feeAbsoluteBaseBeforeChange = fromSatsToUnitOrFractional(
                          Number(feeAbsoluteBase),
                          baseAsset.precision,
                          isLbtcTicker(baseAsset.ticker),
                          lbtcUnit
                        );
                        const feeAbsoluteQuoteBeforeChange = fromSatsToUnitOrFractional(
                          Number(feeAbsoluteQuote),
                          baseAsset.precision,
                          isLbtcTicker(baseAsset.ticker),
                          lbtcUnit
                        );
                        const feeRelativeBeforeChange = Number(feeRelative) / 100;
                        const newValues = form.getFieldsValue();
                        if (
                          newValues.feeAbsoluteBaseInput !== feeAbsoluteBaseBeforeChange ||
                          newValues.feeAbsoluteQuoteInput !== feeAbsoluteQuoteBeforeChange ||
                          newValues.feeRelativeInput.toString() !== feeRelativeBeforeChange.toString()
                        ) {
                          setIsRestartMarketModalVisible(true);
                        } else {
                          setIsFeeFormLocked(true);
                        }
                      }}
                      className="lock-btn"
                      shape="circle"
                      icon={<UnlockOutlined />}
                      disabled={isFeeFormLocked}
                    />
                  </Form.Item>
                </>
              )}
            </Col>
          </Row>
        </div>
      </Form>
      <RestartMarketModal
        setIsRestartMarketModalVisible={setIsRestartMarketModalVisible}
        isRestartMarketModalVisible={isRestartMarketModalVisible}
        saveAndRestart={saveAndRestart}
        resetAll={resetAll}
      />
    </>
  );
};
