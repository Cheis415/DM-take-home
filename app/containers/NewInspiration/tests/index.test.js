/**
 *
 * Tests for Inspiration
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { browserHistory } from 'react-router-dom';

import { NewInspiration, mapDispatchToProps } from '../index';
import configureStore from '../../../configureStore';

describe('<NewInspiration />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <NewInspiration
            inspirations=""
            saving={false}
            resulted={false}
            error={false}
            onChangeInspiration={() => {}}
            onSubmitForm={() => {}}
            onUnmount={() => {}}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <NewInspiration
            inspirations=""
            saving={false}
            resulted={false}
            error={false}
            onChangeInspiration={() => {}}
            onSubmitForm={() => {}}
            onUnmount={() => {}}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('Should call onChangeInspiration with change event on input field', () => {
    const onChangeInspirationSpy = jest.fn();
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <NewInspiration
            inspirations=""
            saving={false}
            resulted={false}
            error={false}
            onChangeInspiration={onChangeInspirationSpy}
            onSubmitForm={() => {}}
            onUnmount={() => {}}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(onChangeInspirationSpy).not.toHaveBeenCalled();
    const inputField = getByPlaceholderText(
      'Whatever Inspiration you can think of!',
    );
    fireEvent.change(inputField, { target: { value: 'a' } });
    expect(onChangeInspirationSpy).toHaveBeenCalled();
  });

  it('Should call onSubmitForm with submit event from form', () => {
    const submitSpy = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <NewInspiration
            inspirations=""
            saving={false}
            resulted={false}
            error={false}
            onChangeInspiration={() => {}}
            onSubmitForm={submitSpy}
            onUnmount={() => {}}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
    const form = getByTestId('inspirationForm');
    fireEvent.submit(form);
    expect(submitSpy).toHaveBeenCalled();
  });

  it('Should call onUnmount when unmounts', () => {
    const onUnmountSpy = jest.fn();
    const { unmount } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <NewInspiration
            inspirations=""
            saving={false}
            resulted={false}
            error={false}
            onChangeInspiration={() => {}}
            onSubmitForm={() => {}}
            onUnmount={onUnmountSpy}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(onUnmountSpy).not.toHaveBeenCalled();
    unmount();
    expect(onUnmountSpy).toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeInspiration', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeInspiration).toBeDefined();
      });

      it('should dispatch changeInspiration when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const inspiration = 'sweet inspiration!';
        const mockEvent = { target: { value: inspiration } };
        result.onChangeInspiration(mockEvent);
        expect(dispatch).toHaveBeenCalledWith(changeInspiration(inspiration));
      });
    });

    describe('onSubmitForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSubmitForm).toBeDefined();
      });

      it('should dispatch saveInspiration when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onSubmitForm();
        expect(dispatch).toHaveBeenCalledWith(saveInspiration());
      });

      it('should preventDefault if called with event', () => {
        const preventDefault = jest.fn();
        const result = mapDispatchToProps(() => {});
        const evt = { preventDefault };
        result.onSubmitForm(evt);
        expect(preventDefault).toHaveBeenCalled();
      });
    });

    describe('onUnmount', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onUnmount).toBeDefined();
      });

      it('should dispatch resetInspiration when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onUnmount();
        expect(dispatch).toHaveBeenCalledWith(resetInspiration());
      });
    });
  });
});
