export type createProductClassificationRequest = {
  body: {
    name: string;
  };
};

export type registerAttributestoProductClassificationRequest = {
  productClassificationCd: string;
  body: registerAttributestoProductClassificationBody;
};

export type registerAttributestoProductClassificationBody = {
  cd: string;
  is_common: 0;
}[];
