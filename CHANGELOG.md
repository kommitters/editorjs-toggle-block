# Changelog

## 0.3.16 (24.04.2024)

- Solving the support to add no-paragraph blocks. See [PR #235](https://github.com/kommitters/editorjs-toggle-block/pull/235)
- Update stale issues policy in CONTRIBUTING.md. See [PR #237](https://github.com/kommitters/editorjs-toggle-block/pull/237) 

## 0.3.15 (09.04.2024)

- Update dependencies and Github workflows. See [PR #213](https://github.com/kommitters/editorjs-toggle-block/pull/213)
- Add playground to test the plugin functionality. See [PR #230](https://github.com/kommitters/editorjs-toggle-block/pull/230)
- Solve security vulnerabilities and update the security policy. See [PR #232](https://github.com/kommitters/editorjs-toggle-block/pull/232)
- Fix wrong added classes in editor.js blocks. See [Issue #227](https://github.com/kommitters/editorjs-toggle-block/issues/227)
- Fix unexpected behavior with undo and redo support. See [PR #231](https://github.com/kommitters/editorjs-toggle-block/pull/231)
- Fix error when deleting toggle items. See [PR #231](https://github.com/kommitters/editorjs-toggle-block/pull/231)

## 0.3.14 (25.10.2023)

- Fix bug [#176](https://github.com/kommitters/editorjs-toggle-block/issues/176) - Fix Settings popover broken from editor.js v2.26 and up.

## 0.3.13 (19.10.2023)

* [Fix bugs in tab shortcut and in drag-and-drop behavior](https://github.com/kommitters/editorjs-toggle-block/issues/203).
* [Fix the enter shortcut to add new items in the toggle block](https://github.com/kommitters/editorjs-toggle-block/pull/217).

## 0.3.12 (14.09.2023)

* Fix typos in code.
* [Fix bug when loading initial data](https://github.com/kommitters/editorjs-toggle-block/issues/206).
* [Update all dependencies](https://github.com/kommitters/editorjs-toggle-block/pull/202).
* [Bump word-wrap from 1.2.3 to 1.2.4](https://github.com/kommitters/editorjs-toggle-block/pull/205).
* [Bump tough-cookie from 4.1.2 to 4.1.3](https://github.com/kommitters/editorjs-toggle-block/pull/204).

## 0.3.11 (19.04.2023)

* Add `.npmignore` file to reduce package size.

## 0.3.10 (31.03.2023)

* Update dependency webpack to v5.76.0 [SECURITY].
* Fix bug that shared id and foreign key when copy-and-paste a toggle.

## 0.3.9 (10.03.2023)

* Update all dependencies.
* Fix bug when plugin is used via CDN. Now accesible through `ToggleBlock`.

## 0.3.8 (13.01.2023)

* Update all dependencies.
* Block egress traffic in GitHub Actions.
* Add stability badge in README.
* Delete `yarn.lock` file to keep a single package manager.

## 0.3.7 (28.12.2022)

* Add Renovate as dependency update tool.
* Update CodeQL workflow.

## 0.3.6 (07.12.2022)

* Bump loader-utils from 1.4.1 to 1.4.2

## 0.3.5 (16.11.2022)

* Fix infinite loop with non-editable block inside toggle.

## 0.3.4 (09.11.2022)

* Bump ossf/scorecard-action to v2.0.6.

## 0.3.3 (09.11.2022)

* Bump loader-utils from 1.4.0 to 1.4.1.

## 0.3.2 (26.10.2022)

* Added Coverage Report with Coveralls.

## 0.3.1 (27.09.2022)

* Fix freeze bug when render children.

## 0.3.0 (14.09.2022)

* Allow config for placeholder & defaultContent.

## 0.2.8 (12.09.2022)

* Update scorecard-action to v2.0.2 which fixes [a bug related to score -1](https://github.com/ossf/scorecard-action/issues/895).
* Add CDN version documentation.

## 0.2.7 (05.09.2022)

* Remove harden runner from scorecard workflow.

## 0.2.6 (05.09.2022)

* Remediate token permission, missing harden runner, and unpinned dependencies security issues in Github Actions.
* Update dependencies.
* Add CodeQL analysis workflow.
* Add OpenSSF Best Practices & OpenSSF Scorecard badges in README.

## 0.2.5 (09.08.2022)

* Add scorecards actions

## 0.2.4 (25.07.2022)

* Add security policy to the repository
* Update packages with known security breaches

## 0.2.3 (15.07.2022)

* Add workflow for automatic publishing in npm.

## 0.2.2 (13.07.2022)

* Replace `crypto.randomUUID()` with `uuid.v4()` to avoid incompatibilities between different browser's versions.

## 0.2.1 (29.06.2022)

* Adjust the behaviour of buttons in the toolbar
* Fix bug when toggle parent is dropped in its children

## 0.2.0 (07.06.2022)

* Add support to drag and drop

## 0.1.2 (12.05.2022)

* Adjust the behavior of the toolbar icon

## 0.1.1 (06.05.2022)

* Improve library docs.
* Fix security vulnerabilities.

## 0.1.0 (05.05.2022)

* Initial release.
