 .then((data) => {
        console.log("data ",data.data.vendorResponseResult);
        sessionStorage.setItem(
          "vendorDetails",
          JSON.stringify({
            VendorId: data.data.vendorResponseResult.vendorId,
            Type: data.data.vendorResponseResult.vendorType,
            AnnualBilling: data.data.vendorResponseResult.annualBillingAmount,
            //"NatureOfServices": data.data.NatureOfService[0].NatureOfService,
            NatureOfServices:
              data.data.vendorResponseResult.natureOfService !== null
                ? data.data.vendorResponseResult.natureOfService.map(
                  (n) => n.natureOfService
                )
                : [],
            VendorName: data.data.vendorResponseResult.vendorName,
          })
        );
        let averageRatingodel = data.data.averageVendorRatingModel;
        dispatch(
          setVendorRating({
            ratingData: data.data.vendorRatingParameter,
            ratingInitialData: JSON.stringify(
              data.data.vendorRatingParameter
            ),
          })
        );
        _calculateInitialScore(data.data.vendorRatingParameter);
        saveRatingModel(averageRatingodel);
        saveRatingFileName(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };