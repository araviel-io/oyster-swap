import React, { useState } from "react";
import { Button, Card, Popover } from "antd";
import { TradeEntry } from "./trade";
import { Settings } from "./settings";
import { SettingOutlined } from "@ant-design/icons";
import { AppBar } from "./appBar";
import { useHistory, useLocation } from "react-router-dom";
import { Container, createStyles, makeStyles, Step, StepButton, StepConnector, StepContent, StepIconProps, StepLabel, Stepper, Theme, Typography, withStyles } from "@material-ui/core";
import clsx from "clsx";
import { isMobile } from "react-device-detect";
import Footer from "./Footer";
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
    }
  ];

  const location = useLocation();
  const history = useHistory();
  const activeTab = location.pathname.indexOf("add") < 0 ? "trade" : "pool";

  const [isSwapped, setisSwapped] = useState(false);
  const [activeStep, setStep] = useState(4);
  const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 23,
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
      description: {
        marginTop: theme.spacing(4),
        textAlign: "left",
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
      lspacer: {
        height: theme.spacing(8),
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
     
      <Container maxWidth="md" style={{paddingLeft: 24, paddingRight: 24, marginTop:48}}>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} style={{ padding: 0 }} orientation="horizontal" connector={<ColorlibConnector />} alternativeLabel>
            {/* Pre select with disabled dropdown ethereum */}
            <Step className={clstep.root}
              expanded={activeStep >= 0}
            //disabled={preventNavigation || isRedeemComplete}
            >
              <StepButton >
                <StepLabel StepIconComponent={ColorlibStepIcon}><b>POWR </b>Source</StepLabel>
              </StepButton>
              {/*<StepButton onClick={() => dispatch(setStep(0))}>Source</StepButton>*/}
            </Step>
            <Step className={clstep.root}
              expanded={activeStep >= 1}
            //disabled={ /* preventNavigation || isRedeemComplete || activeStep === 0*/ }
            >
              <StepButton >
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
              <StepButton>
                <StepLabel StepIconComponent={ColorlibStepIcon}>Redeem tokens</StepLabel>
              </StepButton>
            </Step>
            <Step className={clstep.root} expanded={activeStep >= 4}>
              <StepButton
                onClick={() => setStep(4)}
              >
                <StepLabel style={{ fontWeight: 200 }} StepIconComponent={ColorlibStepIcon}>Swap</StepLabel>
              </StepButton>
            </Step>
          </Stepper>
        </div>
      </Container>
      <div className={classes.lspacer}></div>
      <Container maxWidth="md">
        <div style={isMobile ? {} : { display: 'flex', justifyContent: "space-around", alignItems: "center" }}>
          <div style={{textAlign:"left"}}>
            <Typography variant="h4">
              {isSwapped ? ("Unwrapping") : ("Swapping")}<span style={{ color: '#0ac2af', fontSize: "40px" }}>.</span>
            </Typography>
            <Typography className={classes.description}>
              {isSwapped ? (
                <div>Let's unwrap them to fully land
                  <br /> on blockchain with native Solstice.</div>
              ) : (
                <div>This last part will swap <b>1:1</b> your received
                  <br />wormhole tokens to Wrapped Solstice.</div>
              )}
            </Typography>
          </div>
          <Card
            className="exchange-card"
            style={{border:0}}
            headStyle={{ padding: 0 }}
            bodyStyle={{ position: "relative", padding:25 }}

          >
            {tabList.find((t) => t.key === activeTab)?.render()}
          </Card>
        </div>
      </Container>
      
    </>

  );
};
