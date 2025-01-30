const formatRatingData = (data) => {

  let arr = [];

  const _data = data;



  _data.forEach((d) => {

      if (d.SubParams !== null) {

          d.SubParams.forEach((sp) => {

              sp.ScoreModel.forEach((sm) => {

                  if (sm.IsSelected) {

                      arr.push({

                          "VendorId": vendorId,

                          "RatingParameterId": sp.Id,

                          "ScoringRuleId": sm.Id,

                          "Score": sm.Score,

                          "ScoreLevel": sm.ScoreLevel,

                          "ScoreLevelColor": sm.ScoreColorLevel,

                          "IsDelete": false,

                          "RatingParameter": sp.Title,

                          "RatingRule": sm.label,

                          "Remarks": sm.Remarks

                      })

                  }

              })

          })

      }

      if (d.SubParams === null) {

          d.ScoreModel.forEach((sm) => {

              if (sm.IsSelected) {

                  arr.push({

                      "VendorId": vendorId,

                      "RatingParameterId": d.Id,

                      "ScoringRuleId": sm.Id,

                      "Score": sm.Score,

                      "ScoreLevel": sm.ScoreLevel,

                      "ScoreLevelColor": sm.ScoreColorLevel,

                      "IsDelete": false,

                      "RatingParameter": d.ParameterName,

                      "RatingRule": sm.label,

                      "Remarks": sm.Remarks

                  })

              }

          })

      }

  })

  return arr;

}