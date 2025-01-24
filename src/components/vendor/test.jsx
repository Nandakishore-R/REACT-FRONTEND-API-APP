<Row
            key={key}
            className="vendor-data-rows"
            style={{ marginLeft: "1vw", marginRight: "1vw" }}
          >
            <Col span="24">
              <Row gutter={20}>
                <Col span="6" style={{ marginTop: ".5rem" }}>
                  {param.subParams === null && (
                    <p className="vendor-parameter-name">
                      {param.parameterName}
                    </p>
                  )}
                </Col>
                <Col
                  span="8"
                  style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
                >
                  {param.subParams === null && (
                    <Select
                      disabled={isInViewMode}
                      allowClear={true}
                      className="vendor-select vd-cate-select"
                      size="small"
                      defaultValue={param.scoreModel.filter(
                        (s) => s.isSelected
                      ).map((v) => v.value)}
                      style={{ width: 250 }}
                      options={param.scoreModel}
                      onChange={(e) => handleSelectChange2(e, param.Id)}
                    />
                  )}
                </Col>
                <Col
                  span="6"
                  style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
                >
                  {param.subParams === null && (
                    <TextArea
                      type="text"
                      disabled={isInViewMode}
                      className="data-input"
                      autoSize={{ minRows: 2, maxRows: 2 }}
                      onChange={(e) =>
                        handleRemarksChange(
                          e,
                          param.Id,
                          null,
                          (hasSubparams = false)
                        )
                      }
                      value={param.scoreModel.filter((s) => s.isSelected).map(
                        (v) => v.remarks
                      )}
                    />
                  )}
                </Col>
                <Col span="2" style={{ marginTop: ".5rem" }}>
                  {param.subParams === null && (
                    <Input
                      key={key}
                      disabled
                      value={param.scoreModel.filter((s) => s.isSelected).map(
                        (v) => v.score
                      )}
                      className="vd-r-text-field"
                    />
                  )}
                </Col>
                <Col span="2">
                  {param.subParams === null
                    ? param.scoreModel.map((sm, key) => {
                      const scoreLevel = param.scoreModel.filter(
                        (s) => s.isSelected
                      ).map((v) => v.scoreLevel);
                      const scoreColorLevel = param.scoreModel.filter(
                        (s) => s.isSelected
                      ).map((v) => v.scoreColorLevel);
                      return (
                        sm.isSelected && (
                          <div key={key} className="vd-rating-score">
                            <p>{scoreLevel}</p>
                            <div
                              className="vd-scoreColor"
                              style={{ backgroundColor: scoreColorLevel }}
                            />
                          </div>
                        )
                      );
                    })
                    : null}
                </Col>
                {param.subParams === null && (
                  <Col span="24">
                    <Row>
                      <Col span="24" />
                      <Col span="20">
                        <div className="avg">
                          <p className="vd-avg-text">Average Score</p>
                        </div>
                      </Col>
                      <Col span="4" style={{ paddingLeft: "4.2vw" }}>
                        <div className="avg">
                          {param.scoreModel.map((sm) => {
                            let score = 0;
                            score += sm.isSelected ? parseInt(sm.score) : 0;
                            return (
                              <p key={key}>{parseInt(score.toFixed(2))}</p>
                            );
                          })}
                          {/*{param.averageScore}*/}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                )}
              </Row>
            </Col>
            <Col span="24">
              {param.subParams !== null && (
                <p className="vendor-parameter-name">{param.parameterName}</p>
              )}
              {param.subParams !== null &&
                param.subParams.map((sp, key) => {
                  return (
                    <Row gutter={20} key={key}>
                      <Col
                        span="6"
                        style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
                      >
                        <p className="vendor-sub-parameter-name">{sp.Title}</p>
                      </Col>
                      <Col
                        span="8"
                        className="vd-select-wrapper"
                        style={{ marginTop: ".5rem", marginBottom: "1rem" }}
                      >
                        <Select
                          disabled={isInViewMode}
                          className="vendor-select"
                          size="small"
                          allowClear={true}
                          defaultValue={sp.scoreModel.filter(
                            (s) => s.isSelected
                          ).map((v) => v.value)}
                          onChange={(e) =>
                            handleSelectChange(e, param.Id, sp.Id)
                          }
                          options={sp.scoreModel}
                        />
                      </Col>
                      <Col
                        span="6"
                        style={{ marginTop: "-.2rem", marginBottom: "1rem" }}
                      >
                        <TextArea
                          type="text"
                          disabled={isInViewMode}
                          className="data-input"
                          autoSize={{ minRows: 2, maxRows: 2 }}
                          onChange={(e) =>
                            handleRemarksChange(
                              e,
                              param.Id,
                              sp.Id,
                              (hasSubparams = true)
                            )
                          }
                          value={sp.scoreModel.filter((s) => s.isSelected).map(
                            (v) => v.Remarks
                          )}
                        />
                      </Col>
                      <Col span="2" style={{ marginTop: ".5rem" }}>
                        {
                          <Input
                            key={key}
                            disabled
                            value={sp.scoreModel.filter(
                              (s) => s.isSelected
                            ).map((v) => v.score)}
                            className="vd-r-text-field"
                          />
                        }
                      </Col>
                      <Col span="2">
                        {sp.scoreModel.map((sm, key) => {
                          const scoreLevel = sp.scoreModel.filter(
                            (s) => s.isSelected
                          ).map((v) => v.scoreLevel);
                          const scoreColorLevel = sp.scoreModel.filter(
                            (s) => s.isSelected
                          ).map((v) => v.scoreColorLevel);
                          return (
                            sm.isSelected && (
                              <div key={key} className="vd-rating-score">
                                <p>{sm.scoreLevel}</p>
                                <div
                                  className="vd-scoreColor"
                                  style={{
                                    backgroundColor: sm.scoreColorLevel,
                                  }}
                                />
                              </div>
                            )
                          );
                        })}
                      </Col>
                    </Row>
                  );
                })}
              {param.subParams !== null && (
                <Col span="24">
                  <Row>
                    <Col span="24" />
                    <Col span="20">
                      <div className="avg">
                        <p className="vd-avg-text">Average Score</p>
                      </div>
                    </Col>
                    <Col span="4" style={{ paddingLeft: "4.2vw" }}>
                      <div className="avg">{param.averageScore}</div>
                    </Col>
                  </Row>
                </Col>
              )}
            </Col>
          </Row>