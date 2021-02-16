import makeSelectNewInspiration, {
  selectNewInspirationDomain,
  selectInspiration,
  makeSelectInspiration,
  makeSelectSaving,
  makeSelectResulted,
  makeSelectError,
} from '../selectors';
import { initialState, domainKey } from '../reducer';

describe('selectNewInspirationDomain', () => {
  it('should select the newInspiration state from global state', () => {
    const newInspirationState = { ...initialState };
    const mockedGlobalState = {
      [domainKey]: newInspirationState,
      someOtherDomain: {},
    };
    expect(selectNewInspirationDomain(mockedGlobalState)).toEqual(newInspirationState);
  });

  it('should return initialState as found in reducer if cannot find newInspiration state on global state', () => {
    const mockedGlobalState = {
      someOtherDomain: {},
    };
    expect(selectNewInspirationDomain(mockedGlobalState)).toEqual(initialState);
  });
});

describe('makeSelectNewInspiration', () => {
  const newInspirationDomainSelector = makeSelectNewInspiration();
  it('should select newInspiration state', () => {
    const newInspirationState = { ...initialState };
    const mockedState = {
      [domainKey]: newInspirationState,
      someOtherDomain: {},
    };
    expect(newInspirationDomainSelector(mockedState)).toEqual(newInspirationState);
  });
});

describe('selectInspiration', () => {
  it('should select current inspiration', () => {
    const inspiration = 'hello';
    const mockedState = {
      [domainKey]: { ...initialState, inspiration },
      someOtherDomain: {},
    };
    expect(selectInspiration(mockedState)).toEqual(inspiration);
  });
});

describe('makeSelectInspiration', () => {
  const inspirationSelector = makeSelectInspiration();
  it('should select the inspiration', () => {
    const inspiration = 'hello';
    const mockedState = {
      [domainKey]: { ...initialState, inspiration },
      someOtherDomain: {},
    };
    expect(inspirationSelector(mockedState)).toEqual(inspiration);
  });
});

describe('makeSelectSaving', () => {
  const savingSelector = makeSelectSaving();
  it('should select the saving state', () => {
    const saving = true;
    const mockedState = {
      [domainKey]: { ...initialState, saving },
      someOtherDomain: {},
    };
    expect(savingSelector(mockedState)).toEqual(saving);
  });
});

describe('makeSelectResulted', () => {
  const resultedSelector = makeSelectResulted();
  it('should select the resulted state', () => {
    const resulted = false;
    const mockedState = {
      [domainKey]: { ...initialState, resulted },
      someOtherDomain: {},
    };
    expect(resultedSelector(mockedState)).toEqual(resulted);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error state', () => {
    const error = false;
    const mockedState = {
      [domainKey]: { ...initialState, error },
      someOtherDomain: {},
    };
    expect(errorSelector(mockedState)).toEqual(error);
  });
});