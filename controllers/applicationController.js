const express = require('express');
const router = express.Router();

const balanceSheet = [
    {
        "year": 2020,
        "month": 12,
        "profitOrLoss": 250000,
        "assetsValue": 1234
    },
    {
        "year": 2020,
        "month": 11,
        "profitOrLoss": 1150,
        "assetsValue": 5789
    },
    {
        "year": 2020,
        "month": 10,
        "profitOrLoss": 2500,
        "assetsValue": 22345
    },
    {
        "year": 2020,
        "month": 9,
        "profitOrLoss": -187000,
        "assetsValue": 223452
    }
]

router.get('/fetchBalanceSheet', (req, res) => {
  res.json(balanceSheet);
});

router.post('/submitApplication', (req, res) => {
  const { businessDetails, loanAmount } = req.body;
    console.log(">>>business detials:",businessDetails,"loan amount:",loanAmount)
  //default value for preAssessment
  let preAssessment = 20;
  const totalProfit = balanceSheet.reduce((sum, entry) => sum + entry.profitOrLoss, 0);
  const averageAssetValue = balanceSheet.reduce((sum, entry) => sum + entry.assetsValue, 0) / balanceSheet.length;

  //! The final value to be sent with a field "preAssessment": "60" 
  if (totalProfit > 0) {
    preAssessment = 60;
  }
  //! If the average asset value across 12 months is greater than the loan amount then "preAssessment": "100"
  if (averageAssetValue > loanAmount) {
    preAssessment = 100;
  }

  const applicationResult = {
    ...businessDetails,
    preAssessment,
    
  };

  res.json(applicationResult);
});

module.exports = router;
