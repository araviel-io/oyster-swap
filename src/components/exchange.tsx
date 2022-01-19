import React, { useState } from "react";
import { Button, Card, Popover } from "antd";
import { TradeEntry } from "./trade";
// TODO: remove AddToLiquidity for w integration
import { AddToLiquidity } from "./pool/add";
import { Settings } from "./settings";
import { SettingOutlined } from "@ant-design/icons";
import { AppBar } from "./appBar";
import { useHistory, useLocation } from "react-router-dom";
import { createStyles, makeStyles, Step, StepButton, StepConnector, StepContent, StepIconProps, StepLabel, Stepper, Theme, withStyles } from "@material-ui/core";
import clsx from "clsx";
//const { Text } = Typography;

export const ExchangeView = (props: {}) => {
  const tabStyle: React.CSSProperties = { width: 120 };
  const tabList = [
    {
      key: "trade",
      tab: <div style={tabStyle}>Trade</div>,
      render: () => {
        return <TradeEntry />;
      },
    }/*,
    {
      key: "pool",
      tab: <div style={tabStyle}>Pool</div>,
      render: () => {
        return <AddToLiquidity />;
      },
    },*/
  ];

  const location = useLocation();
  const history = useHistory();
  const activeTab = location.pathname.indexOf("add") < 0 ? "trade" : "pool";

  const [step, setStep] = useState(1);
  const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 39,
      marginLeft: "10%",
      marginRight: "10%",
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient(  95deg,rgb(39 103 129) 0%,rgb(58 137 170) 50%,rgb(87 215 200) 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient(  95deg,rgb(39 103 129) 0%,rgb(39 103 129) 50%,rgb(39 103 129) 100%)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#8f8f8f73',
      borderRadius: 1,
    },
  })(StepConnector);

  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#8f8f8f',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(100 254 210) 0%, rgb(64 147 181) 50%, rgb(46 117 146) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:
        'linear-gradient(  136deg, rgb(58 136 167) 0%, rgb(45 120 151) 50%, rgb(35 93 116) 100%)',
    },
  });

  function ColorlibStepIcon(props: StepIconProps) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <div>1</div>,
      2: <div>2</div>,
      3: <div>3</div>,
      4: <div>4</div>,
      5: <div>5</div>,
    };

    return (
      <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
      },
      preview: {
        border: "2px dashed rgba(145, 158, 171, 0.24)",
        borderRadius: "10px",
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2)
      },
      button: {
        marginRight: theme.spacing(1),
      },
      spacer: {
        height: theme.spacing(3),
      },
      instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    }),
  );


  const classes = useStyles();

  const useStepsStyle = makeStyles({
    root: {
      backgroundColor: 'inherit',

    },
  });
  
  const clstep = useStepsStyle();
  const activeStep = 6;

  return (
    <>
      <AppBar
        right={
          <Popover
            placement="topRight"
            title="Settings"
            content={<Settings />}
            trigger="click"
          >
            <Button
              shape="circle"
              size="large"
              type="text"
              icon={<SettingOutlined />}
            />
          </Popover>
        }
      />

      <Stepper activeStep={activeStep} orientation="horizontal" connector={<ColorlibConnector />} alternativeLabel>
        {/* Pre select with disabled dropdown ethereum */}
        <Step className={clstep.root}
          expanded={activeStep >= 0}
        //disabled={preventNavigation || isRedeemComplete}
        >
          <StepButton onClick={() => setStep(0)}>
            <StepLabel StepIconComponent={ColorlibStepIcon}><b>POWR </b>Source</StepLabel>
          </StepButton>
          {/*<StepButton onClick={() => dispatch(setStep(0))}>Source</StepButton>*/}
        </Step>
        <Step className={clstep.root}
          expanded={activeStep >= 1}
        //disabled={ /* preventNavigation || isRedeemComplete || activeStep === 0*/ }
        >
          <StepButton onClick={() => setStep(1)}>
            <StepLabel StepIconComponent={ColorlibStepIcon}><b>SOLSTICE </b>Target</StepLabel>
          </StepButton>
          {/*<StepButton onClick={() => dispatch(setStep(0))}>Source</StepButton>*/}
        </Step>
        <Step className={clstep.root} expanded={activeStep >= 2} disabled={true}>
          <StepButton>
            <StepLabel StepIconComponent={ColorlibStepIcon}>Send tokens</StepLabel>
          </StepButton>
        </Step>
        <Step className={clstep.root} expanded={activeStep >= 3}>
          <StepButton
            onClick={() => setStep(3)}
          //disabled={!isSendComplete}
          >
            <StepLabel StepIconComponent={ColorlibStepIcon}>Redeem tokens</StepLabel>
          </StepButton>
        </Step>
        <Step className={clstep.root} expanded={activeStep >= 4}>
          <StepButton
            onClick={() => setStep(4)}
          >
            <StepLabel StepIconComponent={ColorlibStepIcon}>Swap</StepLabel>
          </StepButton>
        </Step>
      </Stepper>
      <Card
        className="exchange-card"
        headStyle={{ padding: 0 }}
        bodyStyle={{ position: "relative" }}

      >
        {tabList.find((t) => t.key === activeTab)?.render()}
      </Card>
    </>
  );
};
