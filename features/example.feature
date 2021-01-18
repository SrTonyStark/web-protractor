@Wordpress
Feature: Wordpress

  @Test_1
  Scenario: Usuario accede al home e inicia sesion
    Given Un usuario en el login
    When Se introducen los credenciales
    Then Se accede a la cuenta

  @Test_2
  Scenario: Usuario realiza un comentario
    Given Un usuario logueado
    When Se accede al home
    And Se accede al post
    And Se envía un comentario
    Then Se visualiza el comentario

    @Test_3
    Scenario: Usuario realiza una busqueda
    Given Un usuario en el home
    When Se introduce un dato en la barra de búsqueda
    Then Se devuelve el resultado de la búsqueda
  