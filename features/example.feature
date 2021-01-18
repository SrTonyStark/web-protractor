@Wordpress
Feature: Wordpress
  Scenario: Usuario accede al home e inicia sesion
    Given Estar en el login
    When Se introducen los credenciales
    Then Se accede a la cuenta

  